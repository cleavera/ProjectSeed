import {IModel} from '../interfaces/IModel';
import {ISerialisable} from '../interfaces/ISerialisable';
import {Resource} from './Resource.node';
import {DefaultRestService} from '../restServices/DefaultRestService.node';
import {DecorateField} from '../services/DecorateField.node';

export class Model implements IModel, ISerialisable {
    static resource: typeof Resource = Resource;
    
    static restService: typeof DefaultRestService = DefaultRestService;

    static _fields: any;

    static _map: any;

    static primaryKey: any;

    static description: string;

    static mapFrom: Function;

    static deserialise: Function;

    _errors: any;

    mapTo: Function;

    serialise: () => any;

    get isValid(): boolean {
        return !Object.keys(this._errors).length;
    }

    static addValidator(model: IModel, validatorName: string, validator: (value: any, oldValue?: any) => boolean, field: string): void {
        if (!model._errors) {
            model._errors = {};
        }

        if (!model._errors[field]) {
            model._errors[field] = [];
        }

        let setter: (newValue: any) => void = function (newValue: any): void {
            let errorArray: Array<string> = this._errors[field] || [],
                errorIndex: number = errorArray ? errorArray.indexOf(validatorName) : -1;

            if (!errorArray) {
                this._errors[field] = errorArray;
            }

            if (!validator(newValue, model[field]) && errorIndex === -1) {
                errorArray.push(validatorName);

                this._errors[field] = errorArray;

                return model[field];
            }

            if (validator(newValue, model[field]) && errorIndex !== -1) {
                errorArray.splice(errorIndex, 1);
            }

            if (!errorArray.length) {
                delete this._errors[field];
            }

            return newValue;
        };

        DecorateField.getterSetter(model, field, null, setter);
    }
}
