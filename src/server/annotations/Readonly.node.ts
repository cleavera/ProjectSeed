import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Readonly(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'readonly';

    DecorateField.addDescriptor(target, key, validatorName, true);

    let validator: IValidator = function(newValue: any, oldValue: any): boolean {
        return newValue === oldValue;
    };

    Model.addValidator(target, validatorName, validator, key);
}
