import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../classes/DefaultModel';
import {DecorateField} from '../services/DecorateField';

export function Decimal(decimalPlaces?: number): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string): void {
        const typeName: string = 'decimal';
        const validatorName: string = 'invalidDecimal';

        DecorateField.addType(target, key, typeName);

        if (decimalPlaces !== undefined && decimalPlaces !== null && decimalPlaces >= 1) {
            const decimalPlacesValidatorName: string = 'decimalPlaces';

            DecorateField.addDescriptor(target, key, decimalPlacesValidatorName, decimalPlaces);

            let validator: IValidator = function(newValue: any): boolean {
                if (!(newValue && newValue.toString)) {
                    return true;
                }

                let splitNumber: [string] = newValue.toString().split('.');

                return newValue === undefined
                    || (
                           splitNumber.length === 2
                        && splitNumber[1].length === decimalPlaces
                       );
            };

            DefaultModel.addValidator(target, decimalPlacesValidatorName, validator, key);
        }

        let validator: IValidator = function(newValue: any): boolean {
            return newValue === undefined || typeof newValue === 'number';
        };

        DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
