import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function Json(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'json';
    const validatorName: string = 'invalidJSON';

    DecorateField.addType(target, key, typeName);

    let validator: IValidator = function(newValue: any): boolean {
        if (newValue === undefined) {
            return true;
        }

        try {
            JSON.parse(newValue);
        } catch (e) {
            return false;
        }

        return true;
    };

    DefaultModel.addValidator(target, validatorName, validator, key);
}
