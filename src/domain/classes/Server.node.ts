import * as http from 'http';
import {IRouter} from '../interfaces/IRouter';
import {IResponse} from '../interfaces/IResponse';
import {IRequest} from '../interfaces/IRequest';
import {IServerError} from '../interfaces/IServerError';
import {Api} from './Api.node';
import {Log} from '../services/Log.node';
import {Request} from './Request.node';
import {Response} from './Response.node';
import {DatabaseError} from '../errors/DatabaseError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {InternalServerError} from '../errors/InternalServerError.node';
import {IRoot} from '../interfaces/IRoot';

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

    constructor(serverPort: number, root: IRoot) {
        try {
            this._api = new Api(root);
        } catch (e) {
            if (e instanceof DatabaseError) {
                Log.error(e, 'There was a ' + e.name + ' whilst instantiating.', 'Table: ' + e.table, e.message, e.underlyingError);
            }

            throw new Error();
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

        server.listen(serverPort, () => {
            Log.info((new Date()) + ' Server is listening on port ' + serverPort);
        });
    }

    route(request: IRequest, response: IResponse): void {
        this._api.route(request, response);
    }
}
