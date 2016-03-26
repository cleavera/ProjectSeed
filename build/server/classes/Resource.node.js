"use strict";
var Json_node_1 = require('./Json.node');
var Guid_node_1 = require('../services/Guid.node');
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var Resource = (function () {
    function Resource(resourceName) {
        this._resourceName = resourceName;
        try {
            this._resource = new Json_node_1.Json('./data/' + resourceName + '.json');
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(resourceName, resourceName);
        }
        this._data = this._resource.read();
    }
    Resource.prototype.get = function (id) {
        if (id) {
            if (this._data[id]) {
                return this._data[id];
            }
            else {
                throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(id, this._resourceName);
            }
        }
        else {
            return this._data;
        }
    };
    Resource.prototype.post = function (item) {
        var id = Guid_node_1.Guid.generate();
        this._data[id] = item;
        this._resource.save(this._data);
        return id;
    };
    Resource.prototype.put = function (id, item) {
        this._data[id] = item;
        this._resource.save(this._data);
        return this._data[id];
    };
    Resource.prototype.delete = function (id) {
        delete this._data[id];
        this._resource.save(this._data);
        return {};
    };
    return Resource;
}());
exports.Resource = Resource;
