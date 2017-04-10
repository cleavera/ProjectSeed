"use strict";
const Errors_1 = require('../packages/Errors');
const Helpers_1 = require('../packages/Helpers');
const Context_1 = require('./Context');
class DefaultRestService {
    constructor(request, response, context, Root, eventManager) {
        this._request = request;
        this._response = response;
        this._Model = context.Model;
        this._resourceName = context.resourceName;
        this._context = context;
        try {
            this._resource = new this._Model.resource(this._Model._map.table, Root, eventManager, context.parent);
        }
        catch (e) {
            throw new Errors_1.ResourceNotFoundRoutingError(request.url.toString(), this._resourceName);
        }
    }
    static _appendAllowHeader(response, get, post, put, remove, options) {
        let allow = [];
        if (get) {
            allow.push('GET');
        }
        if (post) {
            allow.push('POST');
        }
        if (put) {
            allow.push('PUT');
        }
        if (remove) {
            allow.push('DELETE');
        }
        if (options) {
            allow.push('OPTIONS');
        }
        response.addHeader('Allow', allow.join(', '));
    }
    get(id) {
        let data, out;
        try {
            data = this._resource.get(id, this._context);
        }
        catch (e) {
            throw new Errors_1.ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
        }
        if (id) {
            let model = this._Model.mapFrom(data, id);
            out = Helpers_1.Transformer.to({
                data: model.serialise(),
                id: id,
                links: this._Model.generateLinks(this._context),
                resourceName: this._resourceName
            });
            DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);
        }
        else {
            out = [];
            for (let dataId in data) {
                if (data.hasOwnProperty(dataId)) {
                    let model = this._Model.mapFrom(data[dataId], dataId), context = new Context_1.Context(this._resourceName, dataId, this._Model, this, this._context.parent);
                    out.push(Helpers_1.Transformer.to({
                        data: model.serialise(),
                        id: dataId,
                        links: this._Model.generateLinks(context),
                        resourceName: this._resourceName
                    }));
                }
            }
            if (this._Model._orderBy) {
                this._Model._orderBy(out);
            }
            DefaultRestService._appendAllowHeader(this._response, true, true, false, false, true);
        }
        this._response.json(out);
    }
    remove(id) {
        if (!id) {
            throw new Errors_1.MethodNotImplementedError();
        }
        this._resource.remove(id);
        this._response.status(204);
    }
    post(item) {
        if (!item.isValid) {
            throw new Errors_1.ResourceValidationError(item._errors);
        }
        let id = this._resource.post(item.mapTo()), record = this._resource.get(id), context = new Context_1.Context(this._resourceName, id, null, null, this._context.parent), model = this._Model.mapFrom(record, id);
        this._response.addHeader('Location', context.generateUrl());
        this._response.status(201);
        this._response.json(Helpers_1.Transformer.to({
            data: model.serialise(),
            id: id,
            links: this._Model.generateLinks(context),
            resourceName: this._resourceName
        }));
    }
    put(id, item) {
        if (!id) {
            throw new Errors_1.MethodNotImplementedError();
        }
        if (!item.isValid) {
            throw new Errors_1.ResourceValidationError(item._errors);
        }
        let record = this._resource.put(id, item.mapTo()), model = this._Model.mapFrom(record, id);
        DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);
        this._response.json(Helpers_1.Transformer.to({
            data: model.serialise(),
            id: id,
            links: this._Model.generateLinks(this._context),
            resourceName: this._resourceName
        }));
    }
    options(id) {
        let links = this._Model.generateLinks(this._context);
        if (id) {
            let data;
            DefaultRestService._appendAllowHeader(this._response, true, false, true, true, true);
            try {
                data = this._resource.get(id, this._context);
            }
            catch (e) {
                throw new Errors_1.ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
            }
        }
        else {
            DefaultRestService._appendAllowHeader(this._response, true, true, false, false, true);
        }
        this._response.json(Helpers_1.Transformer.to({
            data: this._Model._fields,
            id: id,
            links: links,
            resourceName: this._resourceName
        }));
    }
}
exports.DefaultRestService = DefaultRestService;
