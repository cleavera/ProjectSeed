"use strict";
var DefaultModel_node_ts_1 = require('../models/DefaultModel.node.ts');
var DecorateField_node_1 = require('../services/DecorateField.node');
function String(target, key) {
    'use strict';
    var typeName = 'string';
    var validatorName = 'invalidString';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || typeof newValue === 'string';
    };
    DefaultModel_node_ts_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.String = String;
