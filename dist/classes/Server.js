/// <reference path="../../typings/main.d.ts" />
"use strict";
const http = require('http');
const Errors_1 = require('../packages/Errors');
const Helpers_1 = require('../packages/Helpers');
const Api_1 = require('./Api');
const Request_1 = require('./Request');
const Response_1 = require('./Response');
class Server {
    constructor(Root) {
        try {
            this._api = new Api_1.Api(Root);
        }
        catch (e) {
            if (e instanceof Errors_1.DatabaseError) {
                Helpers_1.Log.error(e, 'There was a ' + e.name + ' whilst instantiating.', 'Table: ' + e.table, e.message, e.underlyingError);
            }
            throw e;
        }
        let server = http.createServer((req, res) => {
            let response = new Response_1.Response(res);
            Request_1.Request.fromRequest(req).then(request => {
                try {
                    this.route(request, response);
                }
                catch (e) {
                    Server.handleError(e, response, req.url);
                }
                res.end();
            }, e => {
                Server.handleError(e, response, req.url);
                res.end();
            });
        });
        server.listen(Root.port, () => {
            Helpers_1.Log.info((new Date()) + ' Server is listening on port ' + Root.port);
        });
    }
    static handleError(e, response, url) {
        if (('name' in e) && ('statusCode' in e) && ('serialise' in e)) {
            Helpers_1.Log.info(e.name + ' at ' + url);
            response.status(e.statusCode);
            response.json(e.serialise());
        }
        else {
            let error = new Errors_1.InternalServerError(e.stackTrace);
            Helpers_1.Log.warn(e, e.name + ' at ' + url);
            response.status(error.statusCode);
            response.json(error.serialise());
        }
        if (e instanceof Errors_1.InvalidJsonError) {
            Helpers_1.Log.info(e.name + ' at ' + url + ':\n' + e.json);
        }
    }
    route(request, response) {
        this._api.route(request, response);
    }
}
exports.Server = Server;
