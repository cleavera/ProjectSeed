import { IEventManager, IRequest, IResponse, IRest, IRoutingContext } from '../packages/Interfaces';
export declare class DefaultRestService implements IRest {
    private _request;
    private _response;
    private _Model;
    private _resource;
    private _resourceName;
    private _context;
    private static _appendAllowHeader(response, get, post, put, remove, options);
    constructor(request: IRequest, response: IResponse, context: IRoutingContext, Root: any, eventManager: IEventManager);
    get(id?: string): void;
    remove(id: string): void;
    post(item: any): void;
    put(id: string, item: any): void;
    options(id?: string): void;
}
