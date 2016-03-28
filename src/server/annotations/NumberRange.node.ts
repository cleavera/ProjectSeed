import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function NumberRange(min?: number, max?: number): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string) {
        const validatorName: { min: string, max: string } = {
            min: 'minValue',
            max: 'maxValue'
        };
        
        let minValidator: IValidator = function(newValue: number): boolean {
            return newValue === undefined || newValue >= min;
        };
        
        let maxValidator: IValidator = function(newValue: number): boolean {
            return newValue === undefined || newValue <= max;
        };
        
        if (min !== undefined && min !== null) {
           DecorateField.addDescriptor(target, key, validatorName.min, min);
           Model.addValidator(target, validatorName.min, minValidator, key); 
        }
        
        if (max !== undefined && max !== null) {
           DecorateField.addDescriptor(target, key, validatorName.max, max);
           Model.addValidator(target, validatorName.max, maxValidator, key);
        }
    };
}
