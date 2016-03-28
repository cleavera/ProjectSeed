import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Integer(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'integer';
    const validatorName: string = 'invalidInteger';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };

    Model.addValidator(target, validatorName, validator, key);
}
