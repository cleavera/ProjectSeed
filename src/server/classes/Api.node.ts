import * as fs from 'fs';
import {IRouter} from '../interfaces/IRouter';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IModel} from '../interfaces/IModel';
import {IRest} from '../interfaces/IRest';
import {IRoutingContext} from '../interfaces/IRoutingContext';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {DatabaseError} from '../errors/DatabaseError.node';
import {MethodNotImplementedError} from '../errors/MethodNotImplementedError.node';
import {Json} from '../classes/Json.node';
import {ModelBundle} from '../models/ModelBundle.node';
import {DefaultModel} from '../models/DefaultModel.node';

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

        if (!Json.tableExists('./data/private/association.json')) {
            Json.create('./data/private/association.json');
        }
    }

    route(request: IRequest, response: IResponse): void {
        let context: IRoutingContext = this.getContext(request, response);

        this.appendHeaders(response, context.Model);

        if (request.isGet) {
            return this.get(context.restService, context.id);
        } else if (request.isPut) {
            return this.put(context.restService, context.Model, request.body, context.id);
        } else if (request.isDelete) {
            return this.delete(context.restService, context.id);
        } else if (request.isPost) {
            return this.post(context.restService, context.Model, request.body);
        } else if (request.isOptions) {
            return this.options(context.restService);
        } else {
            if (context.restService[request.type]) {
                return context.restService[request.type]();
            }

            throw new MethodNotImplementedError();
        }
    }

    private getContext(request: IRequest, response: IResponse): IRoutingContext {
        /* tslint:disable:variable-name */
        let resourceName: string = request.url.next().value || '',
            Model: typeof DefaultModel = this._modelList[resourceName.toLowerCase()];
        /* tslint:enable */

        if (!resourceName || this._resourceList.indexOf(resourceName.toLowerCase()) === -1 || !Model) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }

        let restService: IRest;

        try {
            restService = new Model.restService(request, response, Model, resourceName);
        } catch (e) {
            throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }

        let id: string = request.url.next().value;

        return {
            Model: Model,
            id: id,
            resourceName: resourceName,
            restService: restService
        };
    }

    /* tslint:disable variable-name */
    private appendHeaders(response: IResponse, Model: any): void {
        /* tslint:enable */
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

    /* tslint:disable variable-name */
    private put(restService: IRest, Model: any, body: string, id: string): any {
        /* tslint:enable */
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

    /* tslint:disable variable-name */
    private post(restService: IRest, Model: any, body: string): void {
        /* tslint:enable */
        let model: IModel;

        try {
            model = Model.deserialise(body);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.post(model);
    }

    private options(restService: IRest): void {
        return restService.options();
    }
}
