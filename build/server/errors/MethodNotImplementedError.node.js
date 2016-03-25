"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var MethodNotImplementedError = (function (_super) {
    __extends(MethodNotImplementedError, _super);
    function MethodNotImplementedError() {
        _super.call(this);
        this.name = 'MethodNotImplementedError';
        this.message = 'This method has not been implemented.';
        this.statusCode = 405;
    }
    return MethodNotImplementedError;
}(ServerError_node_1.ServerError));
exports.MethodNotImplementedError = MethodNotImplementedError;
