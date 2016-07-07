import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';
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
