import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../classes/DefaultModel';
import {DecorateField} from '../services/DecorateField';
import * as uuid from 'node-uuid';

export function Guid(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'guid';
    const validatorName: string = 'invalidGuid';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'string' && !!uuid.parse(newValue));
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
