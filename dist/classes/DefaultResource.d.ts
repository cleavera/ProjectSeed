import { IEventManager, IRest, IResource, IRoutingContext } from '../packages/Interfaces';
export declare class DefaultResource implements IRest {
    protected _data: any;
    protected _Root: any;
    protected _resource: IResource;
    protected _resourceName: string;
    protected _eventManger: IEventManager;
    protected _parentContext: IRoutingContext;
    constructor(resourceName: string, Root: any, eventManager: IEventManager, parentContext?: IRoutingContext);
    get(id?: string): any;
    post(item: any): string;
    put(id: string, item: any): any;
    remove(id: string): any;
}
