"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Boolean(target, key) {
    'use strict';
    var typeName = 'boolean';
    var validatorName = 'invalidBoolean';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'boolean');
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Boolean = Boolean;
