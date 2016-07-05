import {IRest} from '../interfaces/IRest';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IRoutingContext} from '../interfaces/IRoutingContext';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {DefaultModel} from '../models/DefaultModel.node';
import {MethodNotImplementedError} from '../errors/MethodNotImplementedError.node';

export class DefaultRestService implements IRest {
    private _request: IRequest;

    private _response: IResponse;

    private _Model: typeof DefaultModel;

    private _resource: IRest;

    private _resourceName: string;

    private _context: IRoutingContext;

    /* tslint:disable variable-name */
    constructor(request: IRequest, response: IResponse, context: IRoutingContext, parentContext?: IRoutingContext) {
        /* tslint:enable */
        this._request = request;
        this._response = response;
        this._Model = context.Model;
        this._resourceName = context.resourceName;
        this._context = context;

        try {
            this._resource = new this._Model.resource(this._resourceName, parentContext);
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
            out = this._Model.mapFrom(data, id).serialise();
        } else {
            out = [];

            for (let dataId in data) {
                if (data.hasOwnProperty(dataId)) {
                    out.push(this._Model.mapFrom(data[dataId], dataId).serialise());
                }
            }
        }

        this._response.json(out);
    }

    delete(id: string): void {
        if (!id) {
            throw new MethodNotImplementedError();
        }

        this._resource.delete(id);
        this._response.status(204);
    }

    post(item: any): void {
        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let id: string = this._resource.post(item.mapTo()),
            record: any = this._resource.get(id);

        this._response.status(201);
        this._response.json(this._Model.mapFrom(record, id).serialise());
    }

    put(id: string, item: any): void {
        if (!id) {
            throw new MethodNotImplementedError();
        }

        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let record: any = this._resource.put(id, item.mapTo());

        this._response.json(this._Model.mapFrom(record, id).serialise());
    }

    options(): void {
        this._response.json(this._Model._fields);
    }
}
