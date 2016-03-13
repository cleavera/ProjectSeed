import {IModel} from '../interfaces/IModel';
import {Resource} from './Resource.node';

export class Model implements IModel{
    static resource: typeof Resource = Resource;

    static _fields: Array<string>;

    static _map: any;

    static _primaryKey: string;

    static mapFrom: Function;

    static deserialise: Function;

    _errors: any;

    mapTo: Function;

    serialise: Function;

    get isValid(): boolean {
        return !Object.keys(this._errors).length;
    }
}
