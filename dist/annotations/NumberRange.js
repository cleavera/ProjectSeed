"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function NumberRange(min, max) {
    'use strict';
    return function (target, key) {
        const validatorName = {
            max: 'maxValue',
            min: 'minValue'
        };
        let minValidator = function (newValue) {
            return newValue === undefined || newValue >= min;
        };
        let maxValidator = function (newValue) {
            return newValue === undefined || newValue <= max;
        };
        if (min !== undefined && min !== null) {
            Helpers_1.DecorateField.addDescriptor(target, key, validatorName.min, min);
            Classes_1.DefaultModel.addValidator(target, validatorName.min, minValidator, key);
        }
        if (max !== undefined && max !== null) {
            Helpers_1.DecorateField.addDescriptor(target, key, validatorName.max, max);
            Classes_1.DefaultModel.addValidator(target, validatorName.max, maxValidator, key);
        }
    };
}
exports.NumberRange = NumberRange;
