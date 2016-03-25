import {ServerError} from './ServerError.node';

export class MethodNotImplementedError extends ServerError {
    name: string = 'MethodNotImplementedError';

    message: string = 'This method has not been implemented.';

    statusCode: number = 405;

    constructor() {
        super();
    }
}
