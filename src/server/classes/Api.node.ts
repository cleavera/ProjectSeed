import * as fs from 'fs';
import {IRouter} from '../interfaces/IRouter';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IModel} from '../interfaces/IModel';
import {IRest} from '../interfaces/IRest';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {DatabaseError} from '../errors/DatabaseError.node';
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

            try {
                /* tslint:disable:no-unused-expression */
                new Json('./data/' + tableName + '.json');
                /* tslint:enable */
            } catch (e) {
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
            let resource: IRest;

            try {
                resource = new Model.resource(resourceName);
            } catch (e) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            let id: string = request.url.next().value;

            if (request.isGet) {
                let data: any,
                    out: any;

                try {
                    data = resource.get(id);
                } catch (e) {
                    throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
                }

                if (id) {
                    out = Model.mapFrom(data, id).serialise();
                } else {
                    out = [];

                    for (let id in data) {
                        if (data.hasOwnProperty(id)) {
                            out.push(Model.mapFrom(data[id], id).serialise());
                        }
                    }
                }

                return response.json(out);
            } else if (request.isPut) {
                let model: IModel;

                if (!id) {
                    throw new Error();
                }

                try {
                    model = Model.deserialise(request.body);
                } catch (e) {
                    throw new InvalidJsonError(request.body);
                }

                if (!model.isValid) {
                    throw new ResourceValidationError(model._errors);
                }

                return response.json(resource.put(id, model.mapTo()));
            } else if (request.isDelete) {
                return response.json(resource.delete(id));
            } else if (request.isPost) {
                let model: IModel;

                try {
                    model = Model.deserialise(request.body);
                } catch (e) {
                    throw new InvalidJsonError(request.body);
                }

                if (!model.isValid) {
                    throw new ResourceValidationError(model._errors);
                }

                return response.json(resource.post(model.mapTo()));
            } else {
                throw new Error();
            }
        }

        throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
    }
}
