"use strict";
const Helpers_1 = require('../packages/Helpers');
const Errors_1 = require('../packages/Errors');
const Association_1 = require('./Association');
const Context_1 = require('./Context');
const Json_1 = require('./Json');
const ResourceCreatedEvent_1 = require('../events/ResourceCreatedEvent');
const ResourceDeletedEvent_1 = require('../events/ResourceDeletedEvent');
const ResourceUpdatedEvent_1 = require('../events/ResourceUpdatedEvent');
class DefaultResource {
    constructor(resourceName, Root, eventManager, parentContext) {
        this._resourceName = resourceName;
        this._parentContext = parentContext;
        this._Root = Root;
        this._eventManger = eventManager;
        try {
            this._resource = new Json_1.Json(Root.dataLocation + '/' + resourceName + '.json');
        }
        catch (e) {
            throw new Errors_1.ResourceNotFoundRoutingError(resourceName, resourceName);
        }
        this._data = this._resource.read();
    }
    get(id) {
        let data;
        if (this._parentContext) {
            data = Association_1.Association.filter(new Context_1.Context(this._resourceName, id), this._parentContext, this._data, this._Root);
        }
        else {
            data = this._data;
        }
        if (id) {
            if (data[id]) {
                return data[id];
            }
            else {
                throw new Errors_1.ResourceNotFoundRoutingError(this._resourceName, id);
            }
        }
        else {
            return data;
        }
    }
    post(item) {
        let id = Helpers_1.Guid.generate();
        this._data[id] = item;
        this._resource.save(this._data);
        let context = new Context_1.Context(this._resourceName, id, null, null, this._parentContext);
        if (this._parentContext) {
            Association_1.Association.addAssociation(context, this._parentContext, this._Root);
        }
        this._eventManger.emit(new ResourceCreatedEvent_1.ResourceCreatedEvent(context));
        return id;
    }
    put(id, item) {
        this._data[id] = item;
        this._resource.save(this._data);
        let context = new Context_1.Context(this._resourceName, id, null, null, this._parentContext);
        if (this._parentContext) {
            Association_1.Association.addAssociation(context, this._parentContext, this._Root);
        }
        this._eventManger.emit(new ResourceUpdatedEvent_1.ResourceUpdatedEvent(context));
        return this._data[id];
    }
    remove(id) {
        delete this._data[id];
        this._resource.save(this._data);
        let context = new Context_1.Context(this._resourceName, id, null, null, this._parentContext);
        Association_1.Association.removeAssociation(context, this._Root);
        this._eventManger.emit(new ResourceDeletedEvent_1.ResourceDeletedEvent(context));
        return {};
    }
}
exports.DefaultResource = DefaultResource;
