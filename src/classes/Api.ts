import * as fs from 'fs';
import {IIteratorResult, IModel, IRequest, IResponse, IRest, IRouter, IRoutingContext} from '../packages/Interfaces';
import {DatabaseError, InvalidJsonError, MethodNotImplementedError, RequestNotJSON, ResourceNotFoundRoutingError} from '../packages/Errors';
import {Transformer} from '../packages/Helpers';
import {Context} from './Context';
import {DefaultModel} from './DefaultModel';
import {Json} from './Json';

export class Api implements IRouter {
    private _modelList: any;

    private _Root: any;

    private static createTables(Root: any): void {
        let tables: string[] = [];

        let recursiveSearch: (RootModel: any) => void = function(RootModel: any): void {
            let childResources: string[] = Object.keys(RootModel._children);

            childResources.forEach(child => {
                let Model: any = RootModel._children[child];

                if (Model._map && Model._map.table && tables.indexOf(Model._map.table) === -1) {
                    tables.push(Model._map.table);
                }

                if (Model._children) {
                    recursiveSearch(Model);
                }
            });
        };

        recursiveSearch(Root);

        tables.forEach(table => {
            if (!Json.tableExists('./data/' + table + '.json')) {
                Json.create('./data/' + table + '.json');
            }
        });
    }

    private static appendHeaders(response: IResponse, Model: any): void {
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

    private static put(restService: IRest, Model: any, body: string, id: string): any {
        let model: IModel,
            data: any;

        try {
            data = Transformer.from(body);
            model = Model.deserialise(data.data);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.put(id, model);
    }

    private static remove(restService: IRest, id: string): any {
        return restService.remove(id);
    }

    private static post(restService: IRest, Model: any, body: string): void {
        let model: IModel,
            data: any;

        try {
            data = Transformer.from(body);
            model = Model.deserialise(data.data);
        } catch (e) {
            throw new InvalidJsonError(body);
        }

        return restService.post(model);
    }

    private static options(restService: IRest, id?: string): void {
        return restService.options(id);
    }

    constructor(Root: any) {
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

        this._modelList = Root._children;
        this._Root = Root;

        Api.createTables(Root);

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
            let root: any = new this._Root();

            return response.json(Transformer.to({
                data: root,
                links: root.generateLinks(),
                resourceName: 'apiInfo'
            }));
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
            return Api.options(context.restService, context.id);
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

            let resourceName: string = nextUrlPart.value || '',
                Model: typeof DefaultModel;

            if (parentContext) {
                Model = parentContext.Model._children[resourceName.toLowerCase()];
            } else {
                Model = this._modelList[resourceName.toLowerCase()];
            }

            if (!resourceName || !Model) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            let id: string = request.url.next().value;

            context = new Context(resourceName, id, Model, null, parentContext);

            let restService: IRest;

            try {
                restService = new Model.restService(request, response, context);
            } catch (e) {
                throw new ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }

            context.restService = restService;
        }

        return context;
    }
}
