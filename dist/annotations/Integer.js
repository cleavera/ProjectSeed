"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Integer(target, key) {
    'use strict';
    const typeName = 'integer';
    const validatorName = 'invalidInteger';
    Helpers_1.DecorateField.addType(target, key, typeName);
    let validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Integer = Integer;
