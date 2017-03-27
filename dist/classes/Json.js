"use strict";
const fs = require('fs');
const Errors_1 = require('../packages/Errors');
class Json {
    constructor(path) {
        this._path = path;
        fs.accessSync(path);
    }
    static tableExists(path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static create(path, defaultContent = '{}') {
        fs.writeFile(path, defaultContent, (err) => {
            throw new Errors_1.DatabaseError(path, 'Error creating table', err);
        });
    }
    save(json) {
        fs.writeFileSync(this._path, JSON.stringify(json));
    }
    read() {
        return JSON.parse(fs.readFileSync(this._path).toString());
    }
    remove() {
        fs.writeFileSync(this._path, '');
    }
}
exports.Json = Json;
