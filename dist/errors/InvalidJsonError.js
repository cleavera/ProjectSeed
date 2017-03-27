"use strict";
const ServerError_1 = require('./ServerError');
class InvalidJsonError extends ServerError_1.ServerError {
    constructor(json) {
        super();
        this.name = 'InvalidJsonError';
        this.message = 'An invalid json string was passed';
        this.statusCode = 400;
        this.json = json;
    }
}
exports.InvalidJsonError = InvalidJsonError;
