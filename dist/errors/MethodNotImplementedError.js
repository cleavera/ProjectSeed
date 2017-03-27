"use strict";
const ServerError_1 = require('./ServerError');
class MethodNotImplementedError extends ServerError_1.ServerError {
    constructor() {
        super();
        this.name = 'MethodNotImplementedError';
        this.message = `This method has not been implemented at this location.`;
        this.statusCode = 405;
    }
}
exports.MethodNotImplementedError = MethodNotImplementedError;
