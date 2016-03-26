import {IRest} from '../interfaces/IRest';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IModel} from '../interfaces/IModel';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {Model} from '../classes/Model.node';

export class DefaultRestService implements IRest {
    private _request: IRequest;
    
    private _response: IResponse;
    
    private _Model: typeof Model;
    
    private _resource: IRest;
    
    private _resourceName: string;

    constructor(request: IRequest, response: IResponse, ModelClass: typeof Model, resourceName: string) {
        this._request = request;
        this._response = response;
        this._Model = ModelClass;
        this._resourceName = resourceName;
        
        try {
            this._resource = new ModelClass.resource(resourceName);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
    }

    get(id?: string): void {
        let data: any,
            out: any;

        try {
            data = this._resource.get(id);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
        }

        if (id) {
            out = this._Model.mapFrom(data, id).serialise();
        } else {
            out = [];

            for (let id in data) {
                if (data.hasOwnProperty(id)) {
                    out.push(this._Model.mapFrom(data[id], id).serialise());
                }
            }
        }

        this._response.json(out);
    }
    
    delete(id: string): void {
        this._resource.delete(id)
        this._response.status(204);
    }
    
    post(item: any): void {
        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let id = this._resource.post(item.mapTo()),
            record = this._resource.get(id);

        this._response.status(201);
        this._response.json(this._Model.mapFrom(record, id).serialise());
    }
    
    put(id: string, item: any): void {
        if (!id) {
            throw new Error();
        }

        if (!item.isValid) {
            throw new ResourceValidationError(item._errors);
        }

        let record = this._resource.put(id, item.mapTo());

        this._response.json(this._Model.mapFrom(record, id).serialise());
    }
}
