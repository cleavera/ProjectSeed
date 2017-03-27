"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Options(options) {
    'use strict';
    return function (target, key) {
        const validatorName = 'invalidOption';
        let parsedOptions = [], validValues = [];
        Object.keys(options).forEach(optionLabel => {
            parsedOptions.push({ label: optionLabel, value: options[optionLabel] });
            validValues.push(options[optionLabel]);
        });
        Helpers_1.DecorateField.addDescriptor(target, key, 'options', parsedOptions);
        let validator = function (newValue) {
            return newValue === undefined || validValues.indexOf(newValue) > -1;
        };
        Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
exports.Options = Options;
