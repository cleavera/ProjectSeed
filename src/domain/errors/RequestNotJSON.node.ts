import {ServerError} from './ServerError.node';

export class RequestNotJSON extends ServerError {
    name: string = 'RequestNotJSON';

    message: string = `The request must have the 'content-type' header set to 'application/json'`;

    statusCode: number = 400;

    constructor() {
        super();
    }
}
