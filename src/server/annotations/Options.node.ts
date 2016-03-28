import {IModel} from '../interfaces/IModel';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function Options(options: any): PropertyDecorator {
    'use strict';

    return function(target: IModel, key: string) {
        const validatorName: string = 'invalidOption';
        
        let parsedOptions = [],
            validValues = [];
        
        Object.keys(options).forEach(optionLabel => {
            parsedOptions.push({label: optionLabel, value: options[optionLabel]});
            validValues.push(options[optionLabel]);
        })
        
        DecorateField.addDescriptor(target, key, 'options', parsedOptions);

        let validator: (newValue: any) => boolean = function(newValue: any): boolean {
            return newValue === undefined || validValues.indexOf(newValue) > -1;
        };

        Model.addValidator(target, validatorName, validator, key);
    };
}
