import * as fs from 'fs';
import {IRouter} from '../interfaces/IRouter';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IModel} from '../interfaces/IModel';
import {IRest} from '../interfaces/IRest';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {DatabaseError} from '../errors/DatabaseError.node';
import {MethodNotImplementedError} from '../errors/MethodNotImplementedError.node';
import {Json} from '../classes/Json.node';
import {ModelBundle} from '../models/ModelBundle.node';

export class Api implements IRouter {
    private _resourceList: Array<string>;

    private _modelList: any;

    constructor() {
        fs.mkdir('./data/', (err) => {
            if (err && err.code !== 'EEXIST') {
                throw new DatabaseError('', 'Error creating directory: ./data/', err);
            }
        });

        this._modelList = new ModelBundle();
        this._resourceList = Object.keys(this._modelList);

        this._resourceList.forEach(resourceName => {
            let tableName: string = this._modelList[resourceName]._map.table;

            if (!Json.tableExists('./data/' + tableName + '.json')) {
                Json.create('./data/' + tableName + '.json');
            }
        });
    }

    route(request: IRequest, response: IResponse): void {
        /* tslint:disable:variable-name */
        let resourceName: string = request.url.next().value || '',
            Model: any = this._modelList[resourceName.toLowerCase()];
        /* tslint:enable */

        if (!resourceName || this._resourceList.indexOf(resourceName.toLowerCase()) === -1 || !Model) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
        
        let resource: IRest,
            restService: IRest;

        try {
            resource = new Model.resource(resourceName);
            restService = new Model.restService(request, response, Model, resourceName);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }

        let id: string = request.url.next().value;

        this.appendHeaders(response, Model)

        if (request.isGet) {
            return this.get(restService, id);
        } else if (request.isPut) {
            return this.put(restService, Model, request.body, id);
        } else if (request.isDelete) {
            return this.delete(restService, id);
        } else if (request.isPost) {
            return this.post(restService, Model, request.body);
        } else if (request.isOptions) {
            return this.options(restService);
        } else {
            if (restService[request.type]) {
                return restService[request.type]();
            }

            throw new MethodNotImplementedError();
        }
    }
    
    private appendHeaders(response: IResponse, Model: any): void {
        if (Model.description) {
            response.addHeader('description', Model.description);
        }
    }
    
    private get(restService: IRest, id: string): any {
        if (!restService.get) {
            throw new MethodNotImplementedError();
        }

        return restService.get(id);
    }
    
    private put(restService: IRest, Model: any, body: string, id: string): any {
        let model: IModel;

        try {
            model = Model.deserialise(body);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.put(id, model);
    }
    
    private delete(restService: IRest, id: string): any {
        return restService.delete(id);
    }
    
    private post(restService: IRest, Model: any, body: string): any {
        let model: IModel;

        try {
            model = Model.deserialise(body);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.post(model);
    }
    
    private options(restService: IRest) {
        return restService.options();
    }
}
