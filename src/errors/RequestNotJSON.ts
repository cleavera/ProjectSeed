import {ServerError} from './ServerError';

export class RequestNotJSON extends ServerError {
    name: string = 'RequestNotJSON';

    message: string = `The request must have the 'content-type' header set to 'application/json'`;

    statusCode: number = 415;

    constructor() {
        super();
    }
}
