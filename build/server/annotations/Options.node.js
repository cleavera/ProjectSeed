"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Options(options) {
    'use strict';
    return function (target, key) {
        var validatorName = 'invalidOption';
        var parsedOptions = [], validValues = [];
        Object.keys(options).forEach(function (optionLabel) {
            parsedOptions.push({ label: optionLabel, value: options[optionLabel] });
            validValues.push(options[optionLabel]);
        });
        DecorateField_node_1.DecorateField.addDescriptor(target, key, 'options', parsedOptions);
        var validator = function (newValue) {
            return newValue === undefined || validValues.indexOf(newValue) > -1;
        };
        Model_node_1.Model.addValidator(target, validatorName, validator, key);
    };
}
exports.Options = Options;
