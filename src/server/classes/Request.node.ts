/// <reference path="../../../typings/main.d.ts" />
import {Url} from './Url.node';
import {IRequest} from '../interfaces/IRequest';
import {IUrl} from '../interfaces/IUrl';
import * as http from 'http';

export class Request implements IRequest {
    url: IUrl;

    body: any;

    private _baseRequest: any;

    constructor(request: http.IncomingMessage, body: string) {
        this.url = new Url(request.url);
        this.body = body;
        this._baseRequest = request;
    }

    get isGet(): boolean {
        return this._baseRequest.method.toLowerCase() === 'get';
    }

    get isPut(): boolean {
        return this._baseRequest.method.toLowerCase() === 'put';
    }

    get isPost(): boolean {
        return this._baseRequest.method.toLowerCase() === 'post';
    }

    get isDelete(): boolean {
        return this._baseRequest.method.toLowerCase() === 'delete';
    }

    static fromRequest(request: http.IncomingMessage): Promise<Request> {
        let body: string = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        return new Promise<Request>(resolve => {
            request.on('end', () => {
                if (request.headers['content-type'] === 'application/json' && body) {
                    resolve(new Request(request, JSON.parse(body)));
                } else {
                    resolve(new Request(request, body));
                }
            });
        });
    }
}
