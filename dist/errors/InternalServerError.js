"use strict";
const ServerError_1 = require('./ServerError');
class InternalServerError extends ServerError_1.ServerError {
    constructor(stackTrace) {
        super();
        this.name = 'InternalServerError';
        this.message = 'Uncaught exception';
        this.statusCode = 500;
        this.stackTrace = stackTrace;
    }
}
exports.InternalServerError = InternalServerError;
