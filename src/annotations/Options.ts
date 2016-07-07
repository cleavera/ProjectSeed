import {IModel} from '../interfaces/IModel';
import {IValidator} from '../interfaces/IValidator';
import {DefaultModel} from '../models/DefaultModel';
import {DecorateField} from '../services/DecorateField';

export function Options(options: any): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string): void {
        const validatorName: string = 'invalidOption';

        let parsedOptions: { label: string, value: Object }[] = [],
            validValues: Object[] = [];

        Object.keys(options).forEach(optionLabel => {
            parsedOptions.push({label: optionLabel, value: options[optionLabel]});
            validValues.push(options[optionLabel]);
        });

        DecorateField.addDescriptor(target, key, 'options', parsedOptions);

        let validator: IValidator = function(newValue: any): boolean {
            return newValue === undefined || validValues.indexOf(newValue) > -1;
        };

        DefaultModel.addValidator(target, validatorName, validator, key);
    };
}
