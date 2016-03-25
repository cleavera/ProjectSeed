"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(stackTrace) {
        _super.call(this);
        this.name = 'InternalServerError';
        this.message = 'Uncaught exception';
        this.statusCode = 500;
        this.stackTrace = stackTrace;
    }
    return InternalServerError;
}(ServerError_node_1.ServerError));
exports.InternalServerError = InternalServerError;
