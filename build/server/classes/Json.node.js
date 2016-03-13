"use strict";
var fs = require('fs');
var DatabaseError_node_1 = require('../errors/DatabaseError.node');
var Json = (function () {
    function Json(path) {
        this._path = path;
        fs.accessSync(path);
    }
    Json.create = function (path) {
        fs.writeFile(path, '{}', function (err) {
            throw new DatabaseError_node_1.DatabaseError(path, 'Error creating table', err);
        });
    };
    Json.prototype.save = function (json) {
        fs.writeFileSync(this._path, JSON.stringify(json));
    };
    Json.prototype.read = function () {
        return JSON.parse(fs.readFileSync(this._path).toJSON());
    };
    Json.prototype.remove = function () {
        fs.writeFileSync(this._path, '');
    };
    return Json;
}());
exports.Json = Json;
