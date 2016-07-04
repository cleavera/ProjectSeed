"use strict";
var DefaultModel_node_1 = require('../models/DefaultModel.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Required(target, key) {
    'use strict';
    var validatorName = 'required';
    DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName, true);
    var validator = function (newValue) {
        return !!newValue;
    };
    DefaultModel_node_1.DefaultModel.addValidator(target, validatorName, validator, key);
    target._errors[key].push(validatorName);
}
exports.Required = Required;
