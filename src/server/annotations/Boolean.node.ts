import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';

export function Boolean(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'invalidBoolean';

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'boolean');
    };

    Model.addValidator(target, validatorName, validator, key);
}
