"use strict";
var http = require('http');
var Api_node_1 = require('./Api.node');
var Log_node_1 = require('../services/Log.node');
var Request_node_1 = require('./Request.node');
var Response_node_1 = require('./Response.node');
var DatabaseError_node_1 = require('../errors/DatabaseError.node');
var ResourceValidationError_node_1 = require('../errors/ResourceValidationError.node');
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var Server = (function () {
    function Server(serverPort) {
        var _this = this;
        try {
            this._api = new Api_node_1.Api();
        }
        catch (e) {
            if (e instanceof DatabaseError_node_1.DatabaseError) {
                Log_node_1.Log.error(e, 'There was a ' + e.name + ' whilst instantiating.', 'Table: ' + e.table, e.message, e.underlyingError);
            }
            throw new Error();
        }
        var server = http.createServer(function (req, res) {
            Request_node_1.Request.fromRequest(req).then(function (request) {
                var response = new Response_node_1.Response(res);
                try {
                    _this.route(request, response);
                }
                catch (e) {
                    if (e instanceof ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError) {
                        Log_node_1.Log.warn(e, e.name + ' - The resource ' + e.resource + ' at ' + request.url + ' could not be found.');
                        response.status(404);
                        response.text('The resource at ' + request.url + ' could not be found.');
                    }
                    else if (e instanceof ResourceValidationError_node_1.ResourceValidationError) {
                        Log_node_1.Log.info(e.name + ' at ' + request.url);
                        response.status(e.statusCode);
                        response.json(e.errorObject);
                    }
                    else {
                        Log_node_1.Log.warn(e, e.name + ' at ' + request.url);
                        response.status(500);
                        response.text('Something went wrong. \n' + e.stack);
                    }
                }
                res.end();
            });
        });
        server.listen(serverPort, function () {
            Log_node_1.Log.info((new Date()) + ' Server is listening on port ' + serverPort);
        });
    }
    Server.prototype.route = function (request, response) {
        this._api.route(request, response);
    };
    return Server;
}());
exports.Server = Server;
