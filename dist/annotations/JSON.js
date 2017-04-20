"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Json(target, key) {
    'use strict';
    const typeName = 'json';
    const validatorName = 'invalidJSON';
    Helpers_1.DecorateField.addType(target, key, typeName);
    let validator = function (newValue) {
        if (newValue === undefined) {
            return true;
        }
        try {
            JSON.parse(newValue);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
}
exports.Json = Json;
