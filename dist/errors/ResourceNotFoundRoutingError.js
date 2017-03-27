"use strict";
const ServerError_1 = require('./ServerError');
class ResourceNotFoundRoutingError extends ServerError_1.ServerError {
    constructor(url, resource) {
        super();
        this.name = 'ResourceNotFoundRoutingError';
        this.message = 'The resource could not be found';
        this.statusCode = 404;
        this.url = url;
        this.resource = resource;
    }
}
exports.ResourceNotFoundRoutingError = ResourceNotFoundRoutingError;
