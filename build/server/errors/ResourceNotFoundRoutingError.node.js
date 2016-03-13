"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var ResourceNotFoundRoutingError = (function (_super) {
    __extends(ResourceNotFoundRoutingError, _super);
    function ResourceNotFoundRoutingError(url, resource) {
        _super.call(this);
        this.name = 'ResourceNotFoundRoutingError';
        this.message = 'The resource could not be found';
        this.statusCode = 404;
        this.url = url;
        this.resource = resource;
    }
    return ResourceNotFoundRoutingError;
}(ServerError_node_1.ServerError));
exports.ResourceNotFoundRoutingError = ResourceNotFoundRoutingError;
