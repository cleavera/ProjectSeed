"use strict";
const uuid = require('node-uuid');
class Guid {
    static generate() {
        return uuid.v4();
    }
}
exports.Guid = Guid;
