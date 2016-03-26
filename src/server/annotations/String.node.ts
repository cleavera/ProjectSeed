import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';

export function String(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'invalidString';

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return newValue === undefined || typeof newValue === 'string';
    };

    Model.addValidator(target, validatorName, validator, key);
}
