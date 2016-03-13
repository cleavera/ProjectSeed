"use strict";
var uuid = require('node-uuid');
var Guid = (function () {
    function Guid() {
    }
    Guid.generate = function () {
        return uuid.v4();
    };
    return Guid;
}());
exports.Guid = Guid;
