"use strict";
/// <reference path="../../../typings/main.d.ts" />
var Url_node_1 = require('./Url.node');
var Request = (function () {
    function Request(request, body) {
        this.url = new Url_node_1.Url(request.url);
        this.body = body;
        this._baseRequest = request;
        this.type = this._baseRequest.method.toLowerCase();
    }
    Object.defineProperty(Request.prototype, "isGet", {
        get: function () {
            return this._baseRequest.method.toLowerCase() === 'get';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "isPut", {
        get: function () {
            return this._baseRequest.method.toLowerCase() === 'put';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "isPost", {
        get: function () {
            return this._baseRequest.method.toLowerCase() === 'post';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "isDelete", {
        get: function () {
            return this._baseRequest.method.toLowerCase() === 'delete';
        },
        enumerable: true,
        configurable: true
    });
    Request.fromRequest = function (request) {
        var body = '';
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        return new Promise(function (resolve) {
            request.on('end', function () {
                if (request.headers['content-type'] === 'application/json' && body) {
                    resolve(new Request(request, JSON.parse(body)));
                }
                else {
                    resolve(new Request(request, body));
                }
            });
        });
    };
    return Request;
}());
exports.Request = Request;
