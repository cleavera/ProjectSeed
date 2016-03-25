"use strict";
var fs = require('fs');
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var ResourceValidationError_node_1 = require('../errors/ResourceValidationError.node');
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
            try {
                /* tslint:disable:no-unused-expression */
                new Json_node_1.Json('./data/' + tableName + '.json');
            }
            catch (e) {
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
        if (resourceName) {
            var resource = void 0;
            try {
                resource = new Model.resource(resourceName);
            }
            catch (e) {
                throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
            }
            var id = request.url.next().value;
            if (Model.description) {
                response.addHeader('description', Model.description);
            }
            if (request.isGet) {
                var data = void 0, out = void 0;
                try {
                    data = resource.get(id);
                }
                catch (e) {
                    throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
                }
                if (id) {
                    out = Model.mapFrom(data, id).serialise();
                }
                else {
                    out = [];
                    for (var id_1 in data) {
                        if (data.hasOwnProperty(id_1)) {
                            out.push(Model.mapFrom(data[id_1], id_1).serialise());
                        }
                    }
                }
                return response.json(out);
            }
            else if (request.isPut) {
                var model = void 0;
                if (!id) {
                    throw new Error();
                }
                try {
                    model = Model.deserialise(request.body);
                }
                catch (e) {
                    throw new InvalidJsonError_node_1.InvalidJsonError(request.body);
                }
                if (!model.isValid) {
                    throw new ResourceValidationError_node_1.ResourceValidationError(model._errors);
                }
                return response.json(resource.put(id, model.mapTo()));
            }
            else if (request.isDelete) {
                return response.json(resource.delete(id));
            }
            else if (request.isPost) {
                var model = void 0;
                try {
                    model = Model.deserialise(request.body);
                }
                catch (e) {
                    throw new InvalidJsonError_node_1.InvalidJsonError(request.body);
                }
                if (!model.isValid) {
                    throw new ResourceValidationError_node_1.ResourceValidationError(model._errors);
                }
                return response.json(resource.post(model.mapTo()));
            }
            else {
                throw new MethodNotImplementedError_node_1.MethodNotImplementedError();
            }
        }
        throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
    };
    return Api;
}());
exports.Api = Api;
