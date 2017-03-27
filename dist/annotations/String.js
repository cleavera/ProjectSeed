"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function String(target, key) {
    'use strict';
    const typeName = 'string';
    const validatorName = 'invalidString';
    Helpers_1.DecorateField.addType(target, key, typeName);
    let validator = function (newValue) {
        return newValue === undefined || typeof newValue === 'string';
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.String = String;
