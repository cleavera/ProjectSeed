import {IRest} from './IRest';
import {DefaultModel} from '../models/DefaultModel.node';

export interface IRoutingContext {
    Model?: typeof DefaultModel;

    id: string;

    resourceName: string;

    restService?: IRest;

    parent?: IRoutingContext;
}
