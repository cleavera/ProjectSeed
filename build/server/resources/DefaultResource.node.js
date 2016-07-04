"use strict";
var Json_node_1 = require('../classes/Json.node');
var Guid_node_1 = require('../services/Guid.node');
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var Association_node_1 = require('../classes/Association.node');
var DefaultResource = (function () {
    function DefaultResource(resourceName) {
        this._resourceName = resourceName;
        try {
            this._resource = new Json_node_1.Json('./data/' + resourceName + '.json');
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(resourceName, resourceName);
        }
        this._data = this._resource.read();
    }
    DefaultResource.prototype.get = function (id, parentContext) {
        var data;
        if (parentContext) {
            data = Association_node_1.Association.filter({ id: id, resourceName: this._resourceName }, parentContext, this._data);
        }
        else {
            data = this._data;
        }
        if (id) {
            if (data[id]) {
                return data[id];
            }
            else {
                throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(id, this._resourceName);
            }
        }
        else {
            return data;
        }
    };
    DefaultResource.prototype.post = function (item, parentContext) {
        var id = Guid_node_1.Guid.generate();
        this._data[id] = item;
        this._resource.save(this._data);
        if (parentContext) {
            Association_node_1.Association.addAssociation({ id: id, resourceName: this._resourceName }, parentContext);
        }
        return id;
    };
    DefaultResource.prototype.put = function (id, item, parentContext) {
        this._data[id] = item;
        this._resource.save(this._data);
        if (parentContext) {
            Association_node_1.Association.addAssociation({ id: id, resourceName: this._resourceName }, parentContext);
        }
        return this._data[id];
    };
    DefaultResource.prototype.delete = function (id) {
        delete this._data[id];
        this._resource.save(this._data);
        Association_node_1.Association.removeAssociation({ id: id, resourceName: this._resourceName });
        return {};
    };
    return DefaultResource;
}());
exports.DefaultResource = DefaultResource;
