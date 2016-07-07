import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Readonly(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'readonly';

    DecorateField.addDescriptor(target, key, validatorName, true);

    let validator: IValidator = function(newValue: any, oldValue: any): boolean {
        return newValue === oldValue;
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
