import {IRequest, IUrl} from '../packages/Interfaces';
import {InvalidJsonError} from '../packages/Errors';
import {Url} from './Url';
import * as http from 'http';

export class Request implements IRequest {
    url: IUrl;

    body: any;

    type: string;

    method: string;

    headers: any;

    private _baseRequest: any;

    static fromRequest(request: http.IncomingMessage): Promise<Request> {
        let body: string = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        return new Promise<Request>((resolve, reject) => {
            request.on('end', () => {
                if (request.headers['content-type'] === 'application/json' && body) {
                    try {
                        resolve(new Request(request, JSON.parse(body)));
                    } catch (e) {
                        reject(new InvalidJsonError(body));
                    }
                } else {
                    resolve(new Request(request, body));
                }
            });
        });
    }

    constructor(request: http.IncomingMessage, body: string) {
        this.url = new Url(request.url);
        this.body = body;
        this.method = request.method;
        this.headers = request.headers;
        this._baseRequest = request;
    }

    get isJSON(): boolean {
        return !this.body || this.headers['content-type'] === 'application/json';
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

    get isOptions(): boolean {
        return this._baseRequest.method.toLowerCase() === 'options';
    }
}
