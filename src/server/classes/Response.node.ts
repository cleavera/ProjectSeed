import * as fs from 'fs';
import * as http from 'http';
import {IResponse} from '../interfaces/IResponse';

export class Response implements IResponse {
    private _baseResponse: http.ServerResponse;

    constructor(response: http.ServerResponse) {
        this._baseResponse = response;
    }

    status(code: number): void {
        this._baseResponse.statusCode = code;
    }

    text(message: string): void {
        this._baseResponse.write(message);
    }

    serve(filePath: string): void {
        this._baseResponse.write(fs.readFileSync(filePath));
    }

    json(json: any): void {
        this._baseResponse.setHeader('content-type', 'application/json');

        this._baseResponse.write(JSON.stringify(json));
    }
}
