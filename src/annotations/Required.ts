import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Required(target: IModel, key: string): void {
    'use strict';

    const validatorName: string = 'required';

    DecorateField.addDescriptor(target, key, validatorName, true);

    let validator: IValidator = function(newValue: any): boolean {
        return !!newValue;
    };

    DefaultModel.addValidator(target, validatorName, validator, key);

    target._errors[key].push(validatorName);
}
