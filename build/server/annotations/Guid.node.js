"use strict";
var Model_node_1 = require('../classes/Model.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
var uuid = require('node-uuid');
function Guid(target, key) {
    'use strict';
    var typeName = 'guid';
    var validatorName = 'invalidGuid';
    DecorateField_node_1.DecorateField.addType(target, key, typeName);
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'string' && !!uuid.parse(newValue));
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Guid = Guid;
