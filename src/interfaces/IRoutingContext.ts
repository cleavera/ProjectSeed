import {IRest} from './IRest';
import {DefaultModel} from '../models/DefaultModel.node';

export interface IRoutingContext {
    resourceName: string;

    id?: string;

    Model?: typeof DefaultModel;

    parent?: IRoutingContext;

    restService?: IRest;

    generateUrl(): string;
}
