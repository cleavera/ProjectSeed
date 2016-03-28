"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function MaxLength(length) {
    'use strict';
    return function (target, key) {
        var validatorName = 'maxLength';
        DecorateField_node_1.DecorateField.addDescriptor(target, key, 'maxLength', length);
        var validator = function (newValue) {
            return newValue === undefined || newValue.length <= length;
        };
        Model_node_1.Model.addValidator(target, validatorName, validator, key);
    };
}
exports.MaxLength = MaxLength;
