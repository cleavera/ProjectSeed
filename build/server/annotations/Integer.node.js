"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Integer(target, key) {
    'use strict';
    var typeName = 'integer';
    var validatorName = 'invalidInteger';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Integer = Integer;
