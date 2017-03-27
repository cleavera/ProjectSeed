"use strict";
const ServerError_1 = require('./ServerError');
class AuthorisationError extends ServerError_1.ServerError {
    constructor() {
        super();
        this.name = 'AuthorisationError';
        this.message = 'You are not authorised to view that';
        this.statusCode = 401;
    }
}
exports.AuthorisationError = AuthorisationError;
