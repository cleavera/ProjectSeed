"use strict";
var ServerError = (function () {
    function ServerError() {
        this.stack = new Error().stack;
    }
    ServerError.prototype.serialise = function () {
        return {
            message: this.message,
            name: this.name
        };
    };
    ;
    return ServerError;
}());
exports.ServerError = ServerError;
