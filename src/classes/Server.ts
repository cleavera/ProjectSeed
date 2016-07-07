/// <reference path="../../typings/main.d.ts" />

import * as http from 'http';
import {IRequest} from '../interfaces/IRequest';
import {IResponse} from '../interfaces/IResponse';
import {IRouter} from '../interfaces/IRouter';
import {IServerError} from '../interfaces/IServerError';
import {Api} from './Api';
import {Log} from '../services/Log';
import {Request} from './Request';
import {Response} from './Response';
import {DatabaseError} from '../errors/DatabaseError';
import {InvalidJsonError} from '../errors/InvalidJsonError';
import {InternalServerError} from '../errors/InternalServerError';

export class Server implements IRouter {
    private _api: IRouter;

    private static handleError(e: any, response: IResponse, url: string): void {
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
                        Server.handleError(e, response, req.url);
                    }

                    res.end();
                },
                e => {
                    Server.handleError(e, response, req.url);

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
