"use strict";
const fs = require('fs');
class Response {
    constructor(response) {
        this._baseResponse = response;
    }
    status(code) {
        this._baseResponse.statusCode = code;
    }
    text(message) {
        this._baseResponse.write(message);
    }
    serve(filePath) {
        this._baseResponse.write(fs.readFileSync(filePath));
    }
    json(json) {
        this._baseResponse.setHeader('content-type', 'application/json');
        this._baseResponse.write(JSON.stringify(json));
    }
    addHeader(name, value) {
        this._baseResponse.setHeader(name, value);
    }
}
exports.Response = Response;
