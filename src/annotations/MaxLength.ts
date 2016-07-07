import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../models/DefaultModel';
import {DecorateField} from '../services/DecorateField';

export function MaxLength(length: number): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string): void {
        const validatorName: string = 'maxLength';

        DecorateField.addDescriptor(target, key, validatorName, length);

        let validator: IValidator = function(newValue: any): boolean {
            return newValue === undefined || newValue.length <= length;
        };

        DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
