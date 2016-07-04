"use strict";
var DefaultModel_node_1 = require('../models/DefaultModel.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function MaxLength(length) {
    'use strict';
    return function (target, key) {
        var validatorName = 'maxLength';
        DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName, length);
        var validator = function (newValue) {
            return newValue === undefined || newValue.length <= length;
        };
        DefaultModel_node_1.DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
exports.MaxLength = MaxLength;
