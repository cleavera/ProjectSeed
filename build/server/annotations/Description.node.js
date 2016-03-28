"use strict";
var DecorateField_node_1 = require('../services/DecorateField.node');
function Description(description) {
    'use strict';
    return function (target, key) {
        if (!key) {
            target.description = description;
            return;
        }
        DecorateField_node_1.DecorateField.addDescriptor(target, key, 'description', description);
    };
}
exports.Description = Description;
