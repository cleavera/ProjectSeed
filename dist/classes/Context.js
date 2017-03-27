"use strict";
class Context {
    constructor(resourceName, id, Model, restService, parent) {
        this.id = id;
        this.resourceName = resourceName;
        this.Model = Model;
        this.restService = restService;
        this.parent = parent;
    }
    generateUrl() {
        let recursiveSearch = function (context) {
            let url = '';
            if (context.parent) {
                url = recursiveSearch(context.parent);
            }
            url += '/' + context.resourceName;
            if (context.id) {
                url += '/' + context.id;
            }
            return url;
        };
        return recursiveSearch(this);
    }
}
exports.Context = Context;
