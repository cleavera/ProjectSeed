import { ServerError } from './ServerError';
export declare class InternalServerError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    stackTrace: Object;
    constructor(stackTrace: string);
}
