import { IRest, IRoutingContext } from '../packages/Interfaces';
import { DefaultModel } from './DefaultModel';
export declare class Context implements IRoutingContext {
    id: string;
    Model: typeof DefaultModel;
    parent: IRoutingContext;
    resourceName: string;
    restService: IRest;
    constructor(resourceName: string, id?: string, Model?: typeof DefaultModel, restService?: IRest, parent?: IRoutingContext);
    generateUrl(): string;
}
