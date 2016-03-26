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
        Object.keys(map).forEach(function (field) {
            if (!model._fields[field]) {
                model._fields[field] = {};
            }
        });
        model.mapFrom = function (data, id) {
            var mappedData = {};
            Object.keys(model._fields).forEach(function (field) {
                if (field in map && map[field] in data) {
                    mappedData[field] = data[map[field]];
                }
            });
            return new model(mappedData, id);
        };
        model.deserialise = function (data) {
            var deserialisedData = JSON.parse(data);
            return new model(deserialisedData);
        };
        model.prototype.serialise = function () {
            var _this = this;
            var data = {};
            Object.keys(model._fields).forEach(function (field) {
                data[field] = _this[field];
            });
            return data;
        };
        model.prototype.mapTo = function () {
            var _this = this;
            var data = {};
            Object.keys(model._fields).forEach(function (field) {
                if (field in map && field in _this) {
                    data[map[field]] = _this[field];
                }
            });
            delete data[model.primaryKey];
            return data;
        };
    };
}
exports.Map = Map;
