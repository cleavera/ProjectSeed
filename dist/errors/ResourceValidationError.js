"use strict";
const ServerError_1 = require('./ServerError');
class ResourceValidationError extends ServerError_1.ServerError {
    constructor(errorObject) {
        super();
        this.name = 'ResourceValidationError';
        this.message = 'There are validation errors on the request';
        this.statusCode = 400;
        this.errorObject = errorObject;
    }
    serialise() {
        return {
            error: this.errorObject,
            message: this.message,
            name: this.name
        };
    }
}
exports.ResourceValidationError = ResourceValidationError;
