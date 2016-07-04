"use strict";
var DefaultModel_node_1 = require('../models/DefaultModel.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Readonly(target, key) {
    'use strict';
    var validatorName = 'readonly';
    DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName, true);
    var validator = function (newValue, oldValue) {
        return newValue === oldValue;
    };
    DefaultModel_node_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Readonly = Readonly;
