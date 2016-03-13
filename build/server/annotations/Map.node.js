"use strict";
function Map(table, map) {
    'use strict';
    return function (model) {
        model._map = {
            properties: map,
            table: table
        };
        model._fields = Object.keys(map);
        model.mapFrom = function (data, id) {
            var mappedData = {};
            model._fields.forEach(function (field) {
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
            var _this = this;
            var data = {};
            model._fields.forEach(function (field) {
                data[field] = _this[field];
            });
            return data;
        };
        model.prototype.mapTo = function () {
            var _this = this;
            var data = {};
            model._fields.forEach(function (field) {
                if (field in map && field in _this) {
                    data[map[field]] = _this[field];
                }
            });
            delete data[model._primaryKey];
            return data;
        };
    };
}
exports.Map = Map;
