"use strict";
class ServerError {
    constructor() {
        this.stack = new Error().stack;
    }
    serialise() {
        return {
            message: this.message,
            name: this.name
        };
    }
    ;
}
exports.ServerError = ServerError;
