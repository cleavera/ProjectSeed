import { ServerError } from './ServerError';
export declare class ResourceValidationError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    errorObject: any;
    constructor(errorObject: any);
    serialise(): any;
}
