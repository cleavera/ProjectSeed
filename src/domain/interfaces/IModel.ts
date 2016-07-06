import {IRoutingContext} from './IRoutingContext';

export interface IModel {
    _errors: any;

    mapTo: Function;

    serialise: Function;

    isValid: boolean;

    generateLinks(context: IRoutingContext): any;
}
