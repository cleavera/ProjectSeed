import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';
import * as uuid from 'node-uuid';

export function Guid(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'invalidGuid';

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return typeof newValue === 'string' && !!uuid.parse(newValue);
    };

    Model.addValidator(target, validatorName, validator, key);
}
