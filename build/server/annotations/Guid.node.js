"use strict";
var DefaultModel_node_1 = require('../models/DefaultModel.node');
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
    DefaultModel_node_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Guid = Guid;
