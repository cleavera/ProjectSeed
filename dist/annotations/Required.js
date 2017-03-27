"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Required(target, key) {
    'use strict';
    const validatorName = 'required';
    Helpers_1.DecorateField.addDescriptor(target, key, validatorName, true);
    let validator = function (newValue) {
        return !!newValue;
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
    target._errors[key].push(validatorName);
}
exports.Required = Required;
