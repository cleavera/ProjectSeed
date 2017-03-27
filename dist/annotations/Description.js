"use strict";
const Helpers_1 = require('../packages/Helpers');
function Description(description) {
    'use strict';
    return function (target, key) {
        if (!key) {
            target.description = description;
            return;
        }
        Helpers_1.DecorateField.addDescriptor(target, key, 'description', description);
    };
}
exports.Description = Description;
