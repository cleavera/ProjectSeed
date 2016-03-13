import {IRoutingError} from '../interfaces/IRoutingError';
import {ServerError} from './ServerError.node';

export class ResourceValidationError extends ServerError implements IRoutingError {
    name: string = 'ResourceValidationError';

    message: string = 'There are validation errors on the request';

    statusCode: number = 400;

    errorObject: any;

    constructor(errorObject: any) {
        super();
        this.errorObject = errorObject;
    }
}
