import { IRequest, IResponse, IRouter } from '../packages/Interfaces';
export declare class Api implements IRouter {
    private _modelList;
    private _Root;
    private _Auth;
    private _eventManager;
    private static createTables(Root);
    private static appendHeaders(response, Model, Root);
    private static get(restService, id);
    private static put(restService, Model, body, id);
    private static remove(restService, id);
    private static post(restService, Model, body);
    private static options(restService, id?);
    constructor(Root: any);
    route(request: IRequest, response: IResponse): void;
    private getContext(request, response);
}
