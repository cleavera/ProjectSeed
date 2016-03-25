"use strict";
function Description(description) {
    'use strict';
    return function (target) {
        if (!target._meta) {
            target._meta = {};
        }
        target._meta.description = description;
    };
}
exports.Description = Description;
