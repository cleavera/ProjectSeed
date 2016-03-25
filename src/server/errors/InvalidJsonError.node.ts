import {IRoutingError} from '../interfaces/IRoutingError';
import {ServerError} from './ServerError.node';

export class InvalidJsonError extends ServerError implements IRoutingError {
    name: string = 'InvalidJsonError';

    message: string = 'An invalid json string was passed';

    statusCode: number = 400;

    json: string;

    constructor(json: string) {
        super();

        this.json = json;
    }
}
