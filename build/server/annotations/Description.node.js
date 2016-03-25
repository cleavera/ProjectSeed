"use strict";
function Description(description) {
    'use strict';
    return function (target) {
        target.description = description;
    };
}
exports.Description = Description;
