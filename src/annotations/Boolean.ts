import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Boolean(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'boolean';
    const validatorName: string = 'invalidBoolean';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'boolean');
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
