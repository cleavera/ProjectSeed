import {IModel} from '../interfaces/IModel';
import {ISerialisable} from '../interfaces/ISerialisable';
import {Resource} from './Resource.node';

export class Model implements IModel, ISerialisable {
    static resource: typeof Resource = Resource;

    static _fields: Array<string>;

    static _map: any;

    static _meta: any;

    static mapFrom: Function;

    static deserialise: Function;

    _errors: any;

    mapTo: Function;

    serialise: () => any;

    get isValid(): boolean {
        return !Object.keys(this._errors).length;
    }
}
