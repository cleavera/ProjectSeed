"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
const uuid = require('node-uuid');
function Guid(target, key) {
    'use strict';
    const typeName = 'guid';
    const validatorName = 'invalidGuid';
    Helpers_1.DecorateField.addType(target, key, typeName);
    let validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'string' && !!uuid.parse(newValue));
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Guid = Guid;
