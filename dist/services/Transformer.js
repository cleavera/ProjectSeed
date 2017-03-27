"use strict";
class Transformer {
    static to(data) {
        return {
            attributes: data.data,
            id: data.id,
            links: data.links,
            type: data.resourceName
        };
    }
    static from(json) {
        return {
            data: json.attributes,
            id: json.id,
            resourceName: json.type
        };
    }
}
exports.Transformer = Transformer;
