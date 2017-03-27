"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Decimal(decimalPlaces) {
    'use strict';
    return function (target, key) {
        const typeName = 'decimal';
        const validatorName = 'invalidDecimal';
        Helpers_1.DecorateField.addType(target, key, typeName);
        if (decimalPlaces !== undefined && decimalPlaces !== null && decimalPlaces >= 1) {
            const decimalPlacesValidatorName = 'decimalPlaces';
            Helpers_1.DecorateField.addDescriptor(target, key, decimalPlacesValidatorName, decimalPlaces);
            let validator = function (newValue) {
                if (!(newValue && newValue.toString)) {
                    return true;
                }
                let splitNumber = newValue.toString().split('.');
                return newValue === undefined
                    || (splitNumber.length === 2
                        && splitNumber[1].length === decimalPlaces);
            };
            Classes_1.DefaultModel.addValidator(target, decimalPlacesValidatorName, validator, key);
        }
        let validator = function (newValue) {
            return newValue === undefined || typeof newValue === 'number';
        };
        Classes_1.DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
exports.Decimal = Decimal;
