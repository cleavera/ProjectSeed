/// <reference path="../../typings/main.d.ts" />

import * as http from 'http';
import {IRequest, IResponse, IRouter, IServerError} from '../packages/Interfaces';
import {DatabaseError, InvalidJsonError, InternalServerError} from '../packages/Errors';
import {Log} from '../packages/Helpers';
import {Api} from './Api';
import {Request} from './Request';
import {Response} from './Response';

export class Server implements IRouter {
    private _api: IRouter;

    private static appendHeaders(response: IResponse, Root: any): void {
        if (Root.cors) {
            response.addHeader('Access-Control-Allow-Origin', Root.cors === true ? '*' : Root.cors);
            response.addHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
            response.addHeader('Access-Control-Expose-Headers', 'description, allow, date, location');
            response.addHeader('Access-Control-Allow-Headers', 'content-type');
        }
    }

    private static handleError(e: any, response: IResponse, url: string, Root: any): void {
        this.appendHeaders(response, Root);

        if (('name' in e) && ('statusCode' in e) && ('serialise' in e)) {
            Log.info(e.name + ' at ' + url);
            response.status(e.statusCode);
            response.json(e.serialise());
        } else {
            let error: IServerError = new InternalServerError(e.stackTrace);

            Log.warn(e, e.name + ' at ' + url);
            response.status(error.statusCode);
            response.json(error.serialise());
        }

        if (e instanceof InvalidJsonError) {
            Log.info(e.name + ' at ' + url + ':\n' + e.json);
        }
    }

    constructor(Root: any) {
        try {
            this._api = new Api(Root);
        } catch (e) {
            if (e instanceof DatabaseError) {
                Log.error(e, 'There was a ' + e.name + ' whilst instantiating.', 'Table: ' + e.table, e.message, e.underlyingError);
            }

            throw e;
        }

        let server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
            let response: IResponse = new Response(res);

            Request.fromRequest(req).then(
                request => {
                    try {
                        this.route(request, response);
                    } catch (e) {
                        Server.handleError(e, response, req.url, Root);
                    }

                    res.end();
                },
                e => {
                    Server.handleError(e, response, req.url, Root);

                    res.end();
                }
            );
        });

        server.listen(Root.port, () => {
            Log.info((new Date()) + ' Server is listening on port ' + Root.port);
        });
    }

    route(request: IRequest, response: IResponse): void {
        this._api.route(request, response);
    }
}
