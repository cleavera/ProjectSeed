import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Integer(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'integer';
    const validatorName: string = 'invalidInteger';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
