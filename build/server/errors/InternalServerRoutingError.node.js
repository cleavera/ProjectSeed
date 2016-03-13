"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var InternalServerRoutingError = (function (_super) {
    __extends(InternalServerRoutingError, _super);
    function InternalServerRoutingError(stackTrace) {
        _super.call(this);
        this.name = 'InternalServerRoutingError';
        this.message = 'Uncaught exception';
        this.statusCode = 500;
        this.stackTrace = stackTrace;
    }
    return InternalServerRoutingError;
}(ServerError_node_1.ServerError));
exports.InternalServerRoutingError = InternalServerRoutingError;
