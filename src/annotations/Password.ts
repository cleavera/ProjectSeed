import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Password(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'password';
    const validatorName: string = 'invalidString';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || typeof newValue === 'string';
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
