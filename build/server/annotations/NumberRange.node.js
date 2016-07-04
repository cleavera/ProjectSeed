"use strict";
var DefaultModel_node_1 = require('../models/DefaultModel.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function NumberRange(min, max) {
    'use strict';
    return function (target, key) {
        var validatorName = {
            max: 'maxValue',
            min: 'minValue'
        };
        var minValidator = function (newValue) {
            return newValue === undefined || newValue >= min;
        };
        var maxValidator = function (newValue) {
            return newValue === undefined || newValue <= max;
        };
        if (min !== undefined && min !== null) {
            DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName.min, min);
            DefaultModel_node_1.DefaultModel.addValidator(target, validatorName.min, minValidator, key);
        }
        if (max !== undefined && max !== null) {
            DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName.max, max);
            DefaultModel_node_1.DefaultModel.addValidator(target, validatorName.max, maxValidator, key);
        }
    };
}
exports.NumberRange = NumberRange;
