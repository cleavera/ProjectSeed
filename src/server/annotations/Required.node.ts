import {Model} from '../classes/Model.node';
import {IModel} from '../interfaces/IModel';

export function Required(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'required';

    let validator: (newValue: any) => boolean = function(newValue: any): boolean {
        return !!newValue;
    };

    Model.addValidator(target, validatorName, validator, key);
    
    target._errors[key].push(validatorName);
}
