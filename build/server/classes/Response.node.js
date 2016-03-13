"use strict";
var fs = require('fs');
var Response = (function () {
    function Response(response) {
        this._baseResponse = response;
    }
    Response.prototype.status = function (code) {
        this._baseResponse.statusCode = code;
    };
    Response.prototype.text = function (message) {
        this._baseResponse.write(message);
    };
    Response.prototype.serve = function (filePath) {
        this._baseResponse.write(fs.readFileSync(filePath));
    };
    Response.prototype.json = function (json) {
        this._baseResponse.setHeader('content-type', 'application/json');
        this._baseResponse.write(JSON.stringify(json));
    };
    return Response;
}());
exports.Response = Response;
