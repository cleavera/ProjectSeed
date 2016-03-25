"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var InvalidJsonError = (function (_super) {
    __extends(InvalidJsonError, _super);
    function InvalidJsonError(json) {
        _super.call(this);
        this.name = 'InvalidJsonError';
        this.message = 'An invalid json string was passed';
        this.statusCode = 400;
        this.json = json;
    }
    return InvalidJsonError;
}(ServerError_node_1.ServerError));
exports.InvalidJsonError = InvalidJsonError;
