import { ServerError } from './ServerError';
export declare class RequestNotJSONError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    constructor();
}
