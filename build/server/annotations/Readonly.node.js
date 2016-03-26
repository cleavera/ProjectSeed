"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
function Readonly(target, key) {
    'use strict';
    var validatorName = 'readonly';
    DecorateField_node_1.DecorateField.addDescriptor(target, key, validatorName, true);
    var validator = function (newValue, oldValue) {
        return newValue === oldValue;
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Readonly = Readonly;
