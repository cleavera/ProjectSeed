export function Map(table: string, map: any): ClassDecorator {
    'use strict';

    return function(model: any): void {
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

        model.mapFrom = function(data: any, id: string): any {
            let mappedData: any = {};

            Object.keys(model._fields).forEach(field => {
                if (field in map && map[field] in data) {
                    mappedData[field] = data[map[field]];
                }
            });

            return new model(mappedData, id);
        };

        model.deserialise = function(data: string): any {
            let deserialisedData: any = JSON.parse(data);

            return new model(deserialisedData);
        };

        model.prototype.serialise = function(): any {
            let data: any = {};

            Object.keys(model._fields).forEach(field => {
                data[field] = this[field];
            });

            return data;
        };

        model.prototype.mapTo = function(): any {
            let data: any = {};

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
