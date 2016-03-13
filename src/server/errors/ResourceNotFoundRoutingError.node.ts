import {IRoutingError} from '../interfaces/IRoutingError';
import {ServerError} from './ServerError.node';

export class ResourceNotFoundRoutingError extends ServerError implements IRoutingError {
    name: string = 'ResourceNotFoundRoutingError';

    message: string = 'The resource could not be found';

    statusCode: number = 404;

    resource: string;

    url: string;

    constructor(url: string, resource: string) {
        super();
        this.url = url;
        this.resource = resource;
    }
}
