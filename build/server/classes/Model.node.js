"use strict";
var Resource_node_1 = require('./Resource.node');
var Model = (function () {
    function Model() {
    }
    Object.defineProperty(Model.prototype, "isValid", {
        get: function () {
            return !Object.keys(this._errors).length;
        },
        enumerable: true,
        configurable: true
    });
    Model.resource = Resource_node_1.Resource;
    return Model;
}());
exports.Model = Model;
