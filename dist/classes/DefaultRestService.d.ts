import { IEventManager, IRequest, IResponse, IRest, IRoutingContext } from '../packages/Interfaces';
import { DefaultModel } from './DefaultModel';
export declare class DefaultRestService implements IRest {
    protected _request: IRequest;
    protected _response: IResponse;
    protected _Model: typeof DefaultModel;
    protected _resource: IRest;
    protected _resourceName: string;
    protected _context: IRoutingContext;
    protected static _appendAllowHeader(response: IResponse, get: boolean, post: boolean, put: boolean, remove: boolean, options: boolean): void;
    constructor(request: IRequest, response: IResponse, context: IRoutingContext, Root: any, eventManager: IEventManager);
    get(id?: string): void;
    remove(id: string): void;
    post(item: any): void;
    put(id: string, item: any): void;
    options(id?: string): void;
}
