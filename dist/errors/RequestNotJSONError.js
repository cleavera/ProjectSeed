"use strict";
const ServerError_1 = require('./ServerError');
class RequestNotJSONError extends ServerError_1.ServerError {
    constructor() {
        super();
        this.name = 'RequestNotJSONError';
        this.message = `The request must have the 'content-type' header set to 'application/json'`;
        this.statusCode = 415;
    }
}
exports.RequestNotJSONError = RequestNotJSONError;
