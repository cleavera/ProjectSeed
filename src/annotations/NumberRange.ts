import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function NumberRange(min?: number, max?: number): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string): void {
        const validatorName: { min: string, max: string } = {
            max: 'maxValue',
            min: 'minValue'
        };

        let minValidator: IValidator = function(newValue: number): boolean {
            return newValue === undefined || newValue >= min;
        };

        let maxValidator: IValidator = function(newValue: number): boolean {
            return newValue === undefined || newValue <= max;
        };

        if (min !== undefined && min !== null) {
           DecorateField.addDescriptor(target, key, validatorName.min, min);
           DefaultModel.addValidator(target, validatorName.min, minValidator, key);
        }

        if (max !== undefined && max !== null) {
           DecorateField.addDescriptor(target, key, validatorName.max, max);
           DefaultModel.addValidator(target, validatorName.max, maxValidator, key);
        }
    };
}
