"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function MaxLength(length) {
    'use strict';
    return function (target, key) {
        const validatorName = 'maxLength';
        Helpers_1.DecorateField.addDescriptor(target, key, validatorName, length);
        let validator = function (newValue) {
            return newValue === undefined || newValue.length <= length;
        };
        Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
exports.MaxLength = MaxLength;
