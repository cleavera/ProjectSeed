"use strict";
var DecorateField_node_1 = require('../classes/DecorateField.node');
function Required(target, key) {
    'use strict';
    var validatorName = 'required';
    if (!target._errors) {
        target._errors = {};
    }
    if (!target._errors[key]) {
        target._errors[key] = [];
    }
    target._errors[key].push(validatorName);
    var setter = function (newValue) {
        var errorArray = this._errors[key] || [], errorIndex = errorArray ? errorArray.indexOf(validatorName) : -1;
        if (!errorArray) {
            this._errors[key] = errorArray;
        }
        if (!newValue && errorIndex === -1) {
            errorArray.push(validatorName);
            this._errors[key] = errorArray;
            return target[key];
        }
        if (newValue && errorIndex !== -1) {
            errorArray.splice(errorIndex, 1);
        }
        if (!errorArray.length) {
            delete this._errors[key];
        }
        return newValue;
    };
    DecorateField_node_1.DecorateField.getterSetter(target, key, null, setter);
}
exports.Required = Required;
