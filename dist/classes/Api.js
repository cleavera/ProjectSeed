"use strict";
const fs = require('fs');
const Errors_1 = require('../packages/Errors');
const Helpers_1 = require('../packages/Helpers');
const Context_1 = require('./Context');
const Json_1 = require('./Json');
const EventManager_1 = require('./EventManager');
class Api {
    constructor(Root) {
        fs.mkdir(Root.dataLocation + '/', (err) => {
            if (err && err.code !== 'EEXIST') {
                throw new Errors_1.DatabaseError('', 'Error creating directory: ' + Root.dataLocation + '/', err);
            }
        });
        fs.mkdir(Root.dataLocation + '/private/', (err) => {
            if (err && err.code !== 'EEXIST') {
                throw new Errors_1.DatabaseError('', 'Error creating directory: ' + Root.dataLocation + '/private/', err);
            }
        });
        this._modelList = Root._children;
        this._Root = Root;
        this._eventManager = new EventManager_1.EventManager();
        if (Root.authoriser) {
            this._Auth = new Root.authoriser(Root, this._eventManager);
        }
        Api.createTables(Root);
        if (!Json_1.Json.tableExists(Root.dataLocation + '/private/association.json')) {
            Json_1.Json.create(Root.dataLocation + '/private/association.json', '[]');
        }
    }
    static createTables(Root) {
        let tables = [];
        let recursiveSearch = function (RootModel) {
            let childResources = Object.keys(RootModel._children);
            childResources.forEach(child => {
                let Model = RootModel._children[child];
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
            if (!Json_1.Json.tableExists(Root.dataLocation + '/' + table + '.json')) {
                Json_1.Json.create(Root.dataLocation + '/' + table + '.json');
            }
        });
    }
    static appendHeaders(response, Model, Root) {
        if (Root.cors) {
            response.addHeader('Access-Control-Allow-Origin', Root.cors === true ? '*' : Root.cors);
            response.addHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
            response.addHeader('Access-Control-Expose-Headers', 'description, allow, date, location');
            response.addHeader('Access-Control-Allow-Headers', 'content-type');
        }
        if (Model.description) {
            response.addHeader('description', Model.description);
        }
    }
    static get(restService, id) {
        if (!restService.get) {
            throw new Errors_1.MethodNotImplementedError();
        }
        return restService.get(id);
    }
    static put(restService, Model, body, id) {
        let model, data;
        try {
            data = Helpers_1.Transformer.from(body);
            model = Model.deserialise(data.data);
        }
        catch (e) {
            throw new Errors_1.InvalidJsonError(body);
        }
        return restService.put(id, model);
    }
    static remove(restService, id) {
        return restService.remove(id);
    }
    static post(restService, Model, body) {
        let model, data;
        try {
            data = Helpers_1.Transformer.from(body);
            model = Model.deserialise(data.data);
        }
        catch (e) {
            throw new Errors_1.InvalidJsonError(body);
        }
        return restService.post(model);
    }
    static options(restService, id) {
        return restService.options(id);
    }
    route(request, response) {
        if (!request.isJSON) {
            throw new Errors_1.RequestNotJSONError();
        }
        if (this._Auth && !this._Auth.authorise(request)) {
            throw new Errors_1.AuthorisationError();
        }
        let context = this.getContext(request, response);
        if (!context) {
            let root = new this._Root();
            Api.appendHeaders(response, {}, this._Root);
            return response.json(Helpers_1.Transformer.to({
                data: root,
                links: this._Root.generateLinks(),
                resourceName: 'apiInfo'
            }));
        }
        Api.appendHeaders(response, context.Model, this._Root);
        if (request.isGet) {
            return Api.get(context.restService, context.id);
        }
        else if (request.isPut) {
            return Api.put(context.restService, context.Model, request.body, context.id);
        }
        else if (request.isDelete) {
            return Api.remove(context.restService, context.id);
        }
        else if (request.isPost) {
            if (context.id) {
                throw new Errors_1.MethodNotImplementedError();
            }
            return Api.post(context.restService, context.Model, request.body);
        }
        else if (request.isOptions) {
            return Api.options(context.restService, context.id);
        }
        else if (context.restService[request.method.toLowerCase()]) {
            return context.restService[request.method.toLowerCase()]();
        }
        throw new Errors_1.MethodNotImplementedError();
    }
    getContext(request, response) {
        let parentContext, context = null, done;
        while (!done) {
            let nextUrlPart = request.url.next();
            if (nextUrlPart.done) {
                done = true;
                break;
            }
            parentContext = context;
            let resourceName = nextUrlPart.value || '', Model;
            if (parentContext) {
                Model = parentContext.Model._children[resourceName.toLowerCase()];
            }
            else {
                Model = this._modelList[resourceName.toLowerCase()];
            }
            if (!resourceName || !Model) {
                throw new Errors_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }
            let id = request.url.next().value;
            context = new Context_1.Context(resourceName, id, Model, null, parentContext);
            let restService;
            try {
                restService = new Model.restService(request, response, context, this._Root, this._eventManager);
            }
            catch (e) {
                throw new Errors_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }
            context.restService = restService;
        }
        return context;
    }
}
exports.Api = Api;
