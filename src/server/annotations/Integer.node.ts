import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';

export function Integer(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'invalidInteger';

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };

    Model.addValidator(target, validatorName, validator, key);
}
