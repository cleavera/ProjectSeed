import {IModel} from '../interfaces/IModel';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function String(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'string';
    const validatorName: string = 'invalidString';
    
    DecorateField.addType(target, key, typeName);

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || typeof newValue === 'string';
    };

    Model.addValidator(target, validatorName, validator, key);
}
