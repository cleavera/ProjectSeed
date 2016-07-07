import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../classes/DefaultModel';
import {DecorateField} from '../services/DecorateField';

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
