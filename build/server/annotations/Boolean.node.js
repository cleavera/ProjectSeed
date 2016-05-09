"use strict";
var DefaultModel_node_ts_1 = require('../models/DefaultModel.node.ts');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Boolean(target, key) {
    'use strict';
    var typeName = 'boolean';
    var validatorName = 'invalidBoolean';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'boolean');
    };
    DefaultModel_node_ts_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Boolean = Boolean;
