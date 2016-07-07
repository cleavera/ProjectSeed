import {IModel} from '../interfaces/IModel';
import {IRest} from '../interfaces/IRest';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IRoutingContext} from '../interfaces/IRoutingContext';
import {Context} from '../classes/Context.node';
import {DefaultModel} from '../models/DefaultModel.node';
import {MethodNotImplementedError} from '../errors/MethodNotImplementedError.node';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {Transformer} from '../services/Transformer.node';

export class DefaultRestService implements IRest {
    private _request: IRequest;

    private _response: IResponse;

    private _Model: typeof DefaultModel;

    private _resource: IRest;

    private _resourceName: string;

    private _context: IRoutingContext;

    private static _appendAllowHeader(response: IResponse, get: boolean, post: boolean, put: boolean, remove: boolean, options: boolean): void {
        let allow: string[] = [];

        if (get) {
            allow.push('GET');
        }

        if (post) {
            allow.push('POST');
        }

        if (put) {
            allow.push('PUT');
        }

        if (remove) {
            allow.push('DELETE');
        }

        if (options) {
            allow.push('OPTIONS');
        }

        response.addHeader('Allow', allow.join(', '));
    }

    constructor(request: IRequest, response: IResponse, context: IRoutingContext) {
        this._request = request;
        this._response = response;
        this._Model = context.Model;
        this._resourceName = context.resourceName;
        this._context = context;

        try {
            this._resource = new this._Model.resource(this._resourceName, context.parent);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), this._resourceName);
        }
    }

    get(id?: string): void {
        let data: any,
            out: any;

        try {
            data = this._resource.get(id, this._context);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
        }

        if (id) {
            let model: IModel = this._Model.mapFrom(data, id);
            out = Transformer.to({
                data: model.serialise(),
                id: id,
                links: model.generateLinks(this._context),
                resourceName: this._resourceName
            });

            DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);
        } else {
            out = [];

            for (let dataId in data) {
                if (data.hasOwnProperty(dataId)) {
                    let model: IModel = this._Model.mapFrom(data[dataId], dataId),
                        context: IRoutingContext = new Context(this._resourceName, dataId, this._Model, this, this._context.parent);

                    out.push(Transformer.to({
                        data: model.serialise(),
                        id: dataId,
                        links: model.generateLinks(context),
                        resourceName: this._resourceName
                    }));
                }
            }

            DefaultRestService._appendAllowHeader(this._response, true, true, false, false, true);
        }

        this._response.json(out);
    }

    remove(id: string): void {
        if (!id) {
            throw new MethodNotImplementedError();
        }

        this._resource.remove(id);
        this._response.status(204);
    }

    post(item: any): void {
        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let id: string = this._resource.post(item.mapTo()),
            record: any = this._resource.get(id),
            context: IRoutingContext = new Context(this._resourceName, id, null, null, this._context.parent),
            model: IModel = this._Model.mapFrom(record, id);

        this._response.addHeader('Location', context.generateUrl());
        this._response.status(201);
        this._response.json(Transformer.to({
            data: model.serialise(),
            id: id,
            links: model.generateLinks(context),
            resourceName: this._resourceName
        }));
    }

    put(id: string, item: any): void {
        if (!id) {
            throw new MethodNotImplementedError();
        }

        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let record: any = this._resource.put(id, item.mapTo()),
            model: IModel = this._Model.mapFrom(record, id);

        DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);

        this._response.json(Transformer.to({
            data: model.serialise(),
            id: id,
            links: model.generateLinks(this._context),
            resourceName: this._resourceName
        }));
    }

    options(id?: string): void {
        let links: any;

        if (id) {
            let data: any;

            DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);

            try {
                data = this._resource.get(id, this._context);
            } catch (e) {
                throw new ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
            }

            links = this._Model.mapFrom(data, id).generateLinks(this._context);
        } else {
            DefaultRestService._appendAllowHeader(this._response, true, true, false, false, true);
        }

        this._response.json(Transformer.to({
            data: this._Model._fields,
            id: id,
            links: links,
            resourceName: this._resourceName
        }));
    }
}
