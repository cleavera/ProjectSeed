"use strict";
var fs = require('fs');
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var InvalidJsonError_node_1 = require('../errors/InvalidJsonError.node');
var DatabaseError_node_1 = require('../errors/DatabaseError.node');
var MethodNotImplementedError_node_1 = require('../errors/MethodNotImplementedError.node');
var Json_node_1 = require('../classes/Json.node');
var ModelBundle_node_1 = require('../models/ModelBundle.node');
var Api = (function () {
    function Api() {
        var _this = this;
        fs.mkdir('./data/', function (err) {
            if (err && err.code !== 'EEXIST') {
                throw new DatabaseError_node_1.DatabaseError('', 'Error creating directory: ./data/', err);
            }
        });
        this._modelList = new ModelBundle_node_1.ModelBundle();
        this._resourceList = Object.keys(this._modelList);
        this._resourceList.forEach(function (resourceName) {
            var tableName = _this._modelList[resourceName]._map.table;
            if (!Json_node_1.Json.tableExists('./data/' + tableName + '.json')) {
                Json_node_1.Json.create('./data/' + tableName + '.json');
            }
        });
    }
    Api.prototype.route = function (request, response) {
        /* tslint:disable:variable-name */
        var resourceName = request.url.next().value || '', Model = this._modelList[resourceName.toLowerCase()];
        /* tslint:enable */
        if (!resourceName || this._resourceList.indexOf(resourceName.toLowerCase()) === -1 || !Model) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
        var resource, restService;
        try {
            resource = new Model.resource(resourceName);
            restService = new Model.restService(request, response, Model, resourceName);
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
        var id = request.url.next().value;
        if (Model.description) {
            response.addHeader('description', Model.description);
        }
        if (request.isGet) {
            return this.get(restService, id);
        }
        else if (request.isPut) {
            return this.put(restService, Model, request.body, id);
        }
        else if (request.isDelete) {
            return this.delete(restService, id);
        }
        else if (request.isPost) {
            return this.post(restService, Model, request.body);
        }
        else if (request.isOptions) {
            return this.options(restService);
        }
        else {
            if (restService[request.type]) {
                return restService[request.type]();
            }
            throw new MethodNotImplementedError_node_1.MethodNotImplementedError();
        }
    };
    Api.prototype.get = function (restService, id) {
        if (!restService.get) {
            throw new MethodNotImplementedError_node_1.MethodNotImplementedError();
        }
        return restService.get(id);
    };
    Api.prototype.put = function (restService, Model, body, id) {
        var model;
        try {
            model = Model.deserialise(body);
        }
        catch (e) {
            throw new InvalidJsonError_node_1.InvalidJsonError(body);
        }
        return restService.put(id, model);
    };
    Api.prototype.delete = function (restService, id) {
        return restService.delete(id);
    };
    Api.prototype.post = function (restService, Model, body) {
        var model;
        try {
            model = Model.deserialise(body);
        }
        catch (e) {
            throw new InvalidJsonError_node_1.InvalidJsonError(body);
        }
        return restService.post(model);
    };
    Api.prototype.options = function (restService) {
        return restService.options();
    };
    return Api;
}());
exports.Api = Api;
