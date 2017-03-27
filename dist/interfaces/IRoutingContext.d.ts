import { IRest } from './IRest';
import { DefaultModel } from '../classes/DefaultModel';
export interface IRoutingContext {
    resourceName: string;
    id?: string;
    Model?: typeof DefaultModel;
    parent?: IRoutingContext;
    restService?: IRest;
    generateUrl(): string;
}
