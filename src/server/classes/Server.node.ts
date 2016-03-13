import * as http from 'http';
import {IRouter} from '../interfaces/IRouter';
import {IResponse} from '../interfaces/IResponse';
import {IRequest} from '../interfaces/IRequest';
import {Api} from './Api.node';
import {Log} from '../services/Log.node';
import {Request} from './Request.node';
import {Response} from './Response.node';
import {DatabaseError} from '../errors/DatabaseError.node';
import {ResourceValidationError} from '../errors/ResourceValidationError.node';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';

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
                    if (e instanceof ResourceNotFoundRoutingError) {
                        Log.warn(e, e.name + ' - The resource ' + e.resource + ' at ' + request.url + ' could not be found.');
                        response.status(404);
                        response.text('The resource at ' + request.url + ' could not be found.');
                    } else if (e instanceof ResourceValidationError) {
                        Log.info(e.name + ' at ' + request.url);
                        response.status(e.statusCode);
                        response.json(e.errorObject);
                    } else {
                        Log.warn(e, e.name + ' at ' + request.url);
                        response.status(500);
                        response.text('Something went wrong. \n' + e.stack);
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
