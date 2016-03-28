import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function MaxLength(length: number): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string) {
        const validatorName: string = 'maxLength';
        
        DecorateField.addDescriptor(target, key, validatorName, length);

        let validator: IValidator = function(newValue: any): boolean {
            return newValue === undefined || newValue.length <= length;
        };

        Model.addValidator(target, validatorName, validator, key);
    };
}
