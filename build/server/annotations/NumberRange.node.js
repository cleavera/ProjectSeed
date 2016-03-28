"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function NumberRange(min, max) {
    'use strict';
    return function (target, key) {
        var validatorName = {
            min: 'minValue',
            max: 'maxValue'
        };
        var minValidator = function (newValue) {
            return newValue === undefined || newValue >= min;
        };
        var maxValidator = function (newValue) {
            return newValue === undefined || newValue <= max;
        };
        if (min !== undefined && min !== null) {
            DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName.min, min);
            Model_node_1.Model.addValidator(target, validatorName.min, minValidator, key);
        }
        if (max !== undefined && max !== null) {
            DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName.max, max);
            Model_node_1.Model.addValidator(target, validatorName.max, maxValidator, key);
        }
    };
}
exports.NumberRange = NumberRange;
