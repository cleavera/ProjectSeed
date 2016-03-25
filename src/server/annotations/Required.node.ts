import {DecorateField} from '../classes/DecorateField.node';

export function Required(target: any, key: string): void {
    'use strict';

    const validatorName: string = 'required';

    if (!target._errors) {
        target._errors = {};
    }

    if (!target._errors[key]) {
        target._errors[key] = [];
    }

    target._errors[key].push(validatorName);

    let setter: (newValue: any) => void = function (newValue: any): void {
        let errorArray: Array<string> = this._errors[key] || [],
            errorIndex: number = errorArray ? errorArray.indexOf(validatorName) : -1;

        if (!errorArray) {
            this._errors[key] = errorArray;
        }

        if (!newValue && errorIndex === -1) {
            errorArray.push(validatorName);

            this._errors[key] = errorArray;

            return target[key];
        }

        if (newValue && errorIndex !== -1) {
            errorArray.splice(errorIndex, 1);
        }

        if (!errorArray.length) {
            delete this._errors[key];
        }

        return newValue;
    };

    DecorateField.getterSetter(target, key, null, setter);
}
