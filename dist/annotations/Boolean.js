"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Boolean(target, key) {
    'use strict';
    const typeName = 'boolean';
    const validatorName = 'invalidBoolean';
    Helpers_1.DecorateField.addType(target, key, typeName);
    let validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'boolean');
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Boolean = Boolean;
