import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';

export function Readonly(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'readonly';

    let validator: (newValue: any, oldValue: any) => boolean = function(newValue: any, oldValue: any): boolean {
        return newValue === oldValue;
    };

    Model.addValidator(target, validatorName, validator, key);
}
