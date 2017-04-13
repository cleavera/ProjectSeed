/// <reference path="../../typings/main.d.ts" />
import { IRequest, IResponse, IRouter } from '../packages/Interfaces';
export declare class Server implements IRouter {
    private _api;
    private static appendHeaders(response, Root);
    private static handleError(e, response, url, Root);
    constructor(Root: any);
    route(request: IRequest, response: IResponse): void;
}
