import { IRequest, IUrl } from '../packages/Interfaces';
import * as http from 'http';
export declare class Request implements IRequest {
    url: IUrl;
    body: any;
    type: string;
    method: string;
    headers: any;
    private _baseRequest;
    static fromRequest(request: http.IncomingMessage): Promise<Request>;
    constructor(request: http.IncomingMessage, body: string);
    isJSON: boolean;
    isGet: boolean;
    isPut: boolean;
    isPost: boolean;
    isDelete: boolean;
    isOptions: boolean;
}
