import {IModel} from '../interfaces/IModel';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';
import * as uuid from 'node-uuid';

export function Guid(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'guid';
    const validatorName: string = 'invalidGuid';

    DecorateField.addType(target, key, typeName);

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'string' && !!uuid.parse(newValue));
    };

    Model.addValidator(target, validatorName, validator, key);
}
