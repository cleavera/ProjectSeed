import { IModel, IRoutingContext, ISerialisable } from '../packages/Interfaces';
import { DefaultResource } from './DefaultResource';
import { DefaultRestService } from './DefaultRestService';
export declare class DefaultModel implements IModel, ISerialisable {
    static resource: typeof DefaultResource;
    static restService: typeof DefaultRestService;
    static _fields: any;
    static _map: any;
    static _children: any;
    static primaryKey: any;
    static description: string;
    static mapFrom: Function;
    static deserialise: Function;
    static _orderBy: Function;
    _errors: any;
    mapTo: Function;
    serialise: () => any;
    isValid: boolean;
    static addValidator(model: IModel, validatorName: string, validator: (value: any, oldValue?: any) => boolean, field: string): void;
    static generateLinks(context: IRoutingContext): any;
}
