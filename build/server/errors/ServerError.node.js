"use strict";
var ServerError = (function () {
    function ServerError() {
        this.stack = new Error().stack;
    }
    return ServerError;
}());
exports.ServerError = ServerError;
