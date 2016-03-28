"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Decimal(target, key) {
    'use strict';
    var typeName = 'decimal';
    var validatorName = 'invalidDecimal';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || typeof newValue === 'number';
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Decimal = Decimal;
