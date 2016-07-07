import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

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
