import {IModel} from '../interfaces/IModel';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Boolean(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'boolean';
    const validatorName: string = 'invalidBoolean';
    
    DecorateField.addType(target, key, typeName);

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'boolean');
    };

    Model.addValidator(target, validatorName, validator, key);
}
