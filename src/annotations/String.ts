import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../models/DefaultModel';
import {DecorateField} from '../services/DecorateField';

export function String(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'string';
    const validatorName: string = 'invalidString';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || typeof newValue === 'string';
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
