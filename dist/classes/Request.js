"use strict";
const Errors_1 = require('../packages/Errors');
const Url_1 = require('./Url');
class Request {
    constructor(request, body) {
        this.url = new Url_1.Url(request.url);
        this.body = body;
        this.method = request.method;
        this.headers = request.headers;
        this._baseRequest = request;
    }
    static fromRequest(request) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        return new Promise((resolve, reject) => {
            request.on('end', () => {
                if (request.headers['content-type'] === 'application/json' && body) {
                    try {
                        resolve(new Request(request, JSON.parse(body)));
                    }
                    catch (e) {
                        reject(new Errors_1.InvalidJsonError(body));
                    }
                }
                else {
                    resolve(new Request(request, body));
                }
            });
        });
    }
    get isJSON() {
        return !this.body || this.headers['content-type'] === 'application/json';
    }
    get isGet() {
        return this._baseRequest.method.toLowerCase() === 'get';
    }
    get isPut() {
        return this._baseRequest.method.toLowerCase() === 'put';
    }
    get isPost() {
        return this._baseRequest.method.toLowerCase() === 'post';
    }
    get isDelete() {
        return this._baseRequest.method.toLowerCase() === 'delete';
    }
    get isOptions() {
        return this._baseRequest.method.toLowerCase() === 'options';
    }
}
exports.Request = Request;
