import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Boolean(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'boolean';
    const validatorName: string = 'invalidBoolean';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'boolean');
    };

    Model.addValidator(target, validatorName, validator, key);
}
