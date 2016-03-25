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
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {InvalidJsonError} from '../errors/InvalidJsonError.node';
import {InternalServerError} from '../errors/InternalServerError.node';

export class Server implements IRouter {
    private _api: IRouter;

    constructor(serverPort: number) {
        try {
            this._api = new Api();
        } catch (e) {
            if (e instanceof DatabaseError) {
                Log.error(e, 'There was a ' + e.name + ' whilst instantiating.', 'Table: ' + e.table, e.message, e.underlyingError);
            }

            throw new Error();
        }

        let server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
            Request.fromRequest(req).then(request => {
                let response: IResponse = new Response(res);

                try {
                    this.route(request, response);
                } catch (e) {
                    if (('name' in e) && ('statusCode' in e) && ('serialise' in e)) {
                        Log.info(e.name + ' at ' + request.url);
                        response.status(e.statusCode);
                        response.json(e.serialise());
                    } else {
                        let error: IServerError = new InternalServerError(e.stackTrace);

                        Log.warn(e, e.name + ' at ' + request.url);
                        response.status(error.statusCode);
                        response.json(error.serialise());
                    }

                    if (e instanceof InvalidJsonError) {
                        Log.info(e.name + ' at ' + request.url + ':\n' + e.json);
                    }
                }

                res.end();
            });
        });

        server.listen(serverPort, () => {
            Log.info((new Date()) + ' Server is listening on port ' + serverPort);
        });
    }

    route(request: IRequest, response: IResponse): void {
        this._api.route(request, response);
    }
}
