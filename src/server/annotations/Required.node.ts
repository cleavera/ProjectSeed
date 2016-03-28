import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Required(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'required';
    
    DecorateField.addDescriptor(target, key, validatorName, true);

    let validator: IValidator = function(newValue: any): boolean {
        return !!newValue;
    };

    Model.addValidator(target, validatorName, validator, key);
    
    target._errors[key].push(validatorName);
}
