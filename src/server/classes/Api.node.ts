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

        if (resourceName) {
            let resource: IRest,
                restService: IRest;

            try {
                resource = new Model.resource(resourceName);
                restService = new Model.restService(request, response, Model, resourceName);
            } catch (e) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            let id: string = request.url.next().value;

            if (Model.description) {
                response.addHeader('description', Model.description);
            }

            if (request.isGet) {
                if (!restService.get) {
                    throw new MethodNotImplementedError();
                }

                return restService.get(id);
            } else if (request.isPut) {
                let model: IModel;

                try {
                    model = Model.deserialise(request.body);
                } catch (e) {
                    throw new InvalidJsonError(request.body);
                }

                return restService.put(id, model);
            } else if (request.isDelete) {
                return restService.delete(id);
            } else if (request.isPost) {
                let model: IModel;

                try {
                    model = Model.deserialise(request.body);
                } catch (e) {
                    throw new InvalidJsonError(request.body);
                }

                return restService.post(model);
            } else if (request.isOptions) {
                return restService.options();
            } else {
                if (restService[request.type]) {
                    return restService[request.type]();
                }

                throw new MethodNotImplementedError();
            }
        }

        throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
    }
}
