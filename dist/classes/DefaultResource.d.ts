import { IEventManager, IRest, IRoutingContext } from '../packages/Interfaces';
export declare class DefaultResource implements IRest {
    private _data;
    private _Root;
    private _resource;
    private _resourceName;
    private _eventManger;
    private _parentContext;
    constructor(resourceName: string, Root: any, eventManager: IEventManager, parentContext?: IRoutingContext);
    get(id?: string): any;
    post(item: any): string;
    put(id: string, item: any): any;
    remove(id: string): any;
}
