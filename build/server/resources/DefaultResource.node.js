"use strict";
var Json_node_ts_1 = require('../classes/Json.node.ts');
var Guid_node_ts_1 = require('../services/Guid.node.ts');
var ResourceNotFoundRoutingError_node_ts_1 = require('../errors/ResourceNotFoundRoutingError.node.ts');
var DefaultResource = (function () {
    function DefaultResource(resourceName) {
        this._resourceName = resourceName;
        try {
            this._resource = new Json_node_ts_1.Json('./data/' + resourceName + '.json');
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_ts_1.ResourceNotFoundRoutingError(resourceName, resourceName);
        }
        this._data = this._resource.read();
    }
    DefaultResource.prototype.get = function (id) {
        if (id) {
            if (this._data[id]) {
                return this._data[id];
            }
            else {
                throw new ResourceNotFoundRoutingError_node_ts_1.ResourceNotFoundRoutingError(id, this._resourceName);
            }
        }
        else {
            return this._data;
        }
    };
    DefaultResource.prototype.post = function (item) {
        var id = Guid_node_ts_1.Guid.generate();
        this._data[id] = item;
        this._resource.save(this._data);
        return id;
    };
    DefaultResource.prototype.put = function (id, item) {
        this._data[id] = item;
        this._resource.save(this._data);
        return this._data[id];
    };
    DefaultResource.prototype.delete = function (id) {
        delete this._data[id];
        this._resource.save(this._data);
        return {};
    };
    return DefaultResource;
}());
exports.DefaultResource = DefaultResource;
