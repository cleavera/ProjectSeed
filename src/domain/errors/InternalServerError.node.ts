import {ServerError} from './ServerError.node';

export class InternalServerError extends ServerError {
    name: string = 'InternalServerError';

    message: string = 'Uncaught exception';

    statusCode: number = 500;

    stackTrace: Object;

    constructor(stackTrace: string) {
        super();
        this.stackTrace = stackTrace;
    }
}
