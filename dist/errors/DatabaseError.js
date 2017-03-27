"use strict";
const ServerError_1 = require('./ServerError');
class DatabaseError extends ServerError_1.ServerError {
    constructor(table, message, underlyingError) {
        super();
        this.name = 'DatabaseError';
        this.statusCode = 500;
        this.table = table;
        this.message = message;
        this.underlyingError = underlyingError;
    }
}
exports.DatabaseError = DatabaseError;
