"use strict";
function Map(table, map) {
    'use strict';
    return function (model) {
        model._map = {
            properties: map,
            table: table
        };
        if (!model._fields) {
            model._fields = {};
        }
        Object.keys(map).forEach((field) => {
            if (!model._fields[field]) {
                model._fields[field] = {};
            }
        });
        model.mapFrom = function (data, id) {
            let mappedData = {};
            Object.keys(model._fields).forEach(field => {
                if (field in map && map[field] in data) {
                    mappedData[field] = data[map[field]];
                }
            });
            return new model(mappedData, id);
        };
        model.deserialise = function (data) {
            return new model(data);
        };
        model.prototype.serialise = function () {
            let data = {};
            Object.keys(map).forEach(field => {
                data[field] = this[field];
            });
            return data;
        };
        model.prototype.mapTo = function () {
            let data = {};
            Object.keys(model._fields).forEach(field => {
                if (field in map && field in this) {
                    data[map[field]] = this[field];
                }
            });
            delete data[model.primaryKey];
            return data;
        };
    };
}
exports.Map = Map;
