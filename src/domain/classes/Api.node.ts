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
import {IIteratorResult} from '../interfaces/IIteratorResult';
import {RequestNotJSON} from '../errors/RequestNotJSON.node';
import {IRoot} from '../interfaces/IRoot';

export class Api implements IRouter {
    private _resourceList: Array<string>;

    private _modelList: any;

    private _root: IRoot;

    constructor(root: IRoot) {
        fs.mkdir('./data/', (err) => {
            if (err && err.code !== 'EEXIST') {
                throw new DatabaseError('', 'Error creating directory: ./data/', err);
            }
        });

        fs.mkdir('./data/private/', (err) => {
            if (err && err.code !== 'EEXIST') {
                throw new DatabaseError('', 'Error creating directory: ./data/private/', err);
            }
        });

        this._modelList = new ModelBundle();
        this._resourceList = Object.keys(this._modelList);
        this._root = root;

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
        if (!request.isJSON) {
            throw new RequestNotJSON();
        }

        let context: IRoutingContext = this.getContext(request, response);

        if (!context) {
            return response.json(this._root);
        }

        Api.appendHeaders(response, context.Model);

        if (request.isGet) {
            return Api.get(context.restService, context.id);
        } else if (request.isPut) {
            return Api.put(context.restService, context.Model, request.body, context.id);
        } else if (request.isDelete) {
            return Api.remove(context.restService, context.id);
        } else if (request.isPost) {
            if (context.id) {
                throw new MethodNotImplementedError();
            }

            return Api.post(context.restService, context.Model, request.body);
        } else if (request.isOptions) {
            return Api.options(context.restService);
        } else if (context.restService[request.method.toLowerCase()]) {
            return context.restService[request.method.toLowerCase()]();
        }

        throw new MethodNotImplementedError();
    }

    private getContext(request: IRequest, response: IResponse): IRoutingContext {
        let parentContext: IRoutingContext,
            context: IRoutingContext = null,
            done: boolean;

        while (!done) {
            let nextUrlPart: IIteratorResult = request.url.next();

            if (nextUrlPart.done) {
               done = true;
               break;
            }

            parentContext = context;

            /* tslint:disable:variable-name */
            let resourceName: string = nextUrlPart.value || '',
                Model: typeof DefaultModel;
            /* tslint:enable */

            if (parentContext) {
                Model = parentContext.Model._children[resourceName.toLowerCase()];
            } else {
                Model = this._modelList[resourceName.toLowerCase()];
            }

            if (!resourceName || !Model) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            let id: string = request.url.next().value;

            context = {
                Model: Model,
                id: id,
                resourceName: resourceName
            };

            let restService: IRest;

            try {
                restService = new Model.restService(request, response, context, parentContext);
            } catch (e) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            context.restService = restService;
        }

        return context;
    }

    /* tslint:disable variable-name */
    private static appendHeaders(response: IResponse, Model: any): void {
        /* tslint:enable */
        if (Model.description) {
            response.addHeader('description', Model.description);
        }
    }

    private static get(restService: IRest, id: string): any {
        if (!restService.get) {
            throw new MethodNotImplementedError();
        }

        return restService.get(id);
    }

    /* tslint:disable variable-name */
    private static put(restService: IRest, Model: any, body: string, id: string): any {
        /* tslint:enable */
        let model: IModel;

        try {
            model = Model.deserialise(body);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.put(id, model);
    }

    private static remove(restService: IRest, id: string): any {
        return restService.remove(id);
    }

    /* tslint:disable variable-name */
    private static post(restService: IRest, Model: any, body: string): void {
        /* tslint:enable */
        let model: IModel;

        try {
            model = Model.deserialise(body);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.post(model);
    }

    private static options(restService: IRest): void {
        return restService.options();
    }
}
