import {IRoutingError} from '../interfaces/IRoutingError';
import {ServerError} from './ServerError.node';

export class InternalServerRoutingError extends ServerError implements IRoutingError {
    name: string = 'InternalServerRoutingError';

    message: string = 'Uncaught exception';

    statusCode: number = 500;

    stackTrace: Object;

    constructor(stackTrace: string) {
        super();
        this.stackTrace = stackTrace;
    }
}
