"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Readonly(target, key) {
    'use strict';
    const validatorName = 'readonly';
    Helpers_1.DecorateField.addDescriptor(target, key, validatorName, true);
    let validator = function (newValue, oldValue) {
        return newValue === oldValue;
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Readonly = Readonly;
