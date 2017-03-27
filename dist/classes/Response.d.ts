import * as http from 'http';
import { IResponse } from '../packages/Interfaces';
export declare class Response implements IResponse {
    private _baseResponse;
    constructor(response: http.ServerResponse);
    status(code: number): void;
    text(message: string): void;
    serve(filePath: string): void;
    json(json: any): void;
    addHeader(name: string, value: string): void;
}
