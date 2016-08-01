import {ServerError} from './ServerError';

export class RequestNotJSONError extends ServerError {
    name: string = 'RequestNotJSONError';

    message: string = `The request must have the 'content-type' header set to 'application/json'`;

    statusCode: number = 415;

    constructor() {
        super();
    }
}
