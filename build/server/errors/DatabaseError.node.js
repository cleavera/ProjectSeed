"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerError_node_1 = require('./ServerError.node');
var DatabaseError = (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(table, message, underlyingError) {
        _super.call(this);
        this.name = 'DatabaseError';
        this.statusCode = 500;
        this.table = table;
        this.message = message;
        this.underlyingError = underlyingError;
    }
    return DatabaseError;
}(ServerError_node_1.ServerError));
exports.DatabaseError = DatabaseError;
