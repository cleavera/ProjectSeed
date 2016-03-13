"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var ResourceValidationError = (function (_super) {
    __extends(ResourceValidationError, _super);
    function ResourceValidationError(errorObject) {
        _super.call(this);
        this.name = 'ResourceValidationError';
        this.message = 'There are validation errors on the request';
        this.statusCode = 400;
        this.errorObject = errorObject;
    }
    return ResourceValidationError;
}(ServerError_node_1.ServerError));
exports.ResourceValidationError = ResourceValidationError;
