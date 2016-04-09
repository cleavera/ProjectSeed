"use strict";
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var ResourceValidationError_node_1 = require('../errors/ResourceValidationError.node');
var DefaultRestService = (function () {
    function DefaultRestService(request, response, ModelClass, resourceName) {
        this._request = request;
        this._response = response;
        this._Model = ModelClass;
        this._resourceName = resourceName;
        try {
            this._resource = new ModelClass.resource(resourceName);
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
    }
    DefaultRestService.prototype.get = function (id) {
        var data, out;
        try {
            data = this._resource.get(id);
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
        }
        if (id) {
            out = this._Model.mapFrom(data, id).serialise();
        }
        else {
            out = [];
            for (var dataId in data) {
                if (data.hasOwnProperty(dataId)) {
                    out.push(this._Model.mapFrom(data[dataId], dataId).serialise());
                }
            }
        }
        this._response.json(out);
    };
    DefaultRestService.prototype.delete = function (id) {
        this._resource.delete(id);
        this._response.status(204);
    };
    DefaultRestService.prototype.post = function (item) {
        if (!item.isValid) {
            throw new ResourceValidationError_node_1.ResourceValidationError(item._errors);
        }
        var id = this._resource.post(item.mapTo()), record = this._resource.get(id);
        this._response.status(201);
        this._response.json(this._Model.mapFrom(record, id).serialise());
    };
    DefaultRestService.prototype.put = function (id, item) {
        if (!id) {
            throw new Error();
        }
        if (!item.isValid) {
            throw new ResourceValidationError_node_1.ResourceValidationError(item._errors);
        }
        var record = this._resource.put(id, item.mapTo());
        this._response.json(this._Model.mapFrom(record, id).serialise());
    };
    DefaultRestService.prototype.options = function () {
        this._response.json(this._Model._fields);
    };
    return DefaultRestService;
}());
exports.DefaultRestService = DefaultRestService;
