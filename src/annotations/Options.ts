import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

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
