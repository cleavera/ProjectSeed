import {ServerError} from './ServerError';

export class ResourceValidationError extends ServerError {
    name: string = 'ResourceValidationError';

    message: string = 'There are validation errors on the request';

    statusCode: number = 400;

    errorObject: any;

    constructor(errorObject: any) {
        super();
        this.errorObject = errorObject;
    }

    serialise(): any {
        return {
            error: this.errorObject,
            message: this.message,
            name: this.name
        };
    }
}
