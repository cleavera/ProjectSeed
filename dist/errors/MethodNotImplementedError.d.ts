import { ServerError } from './ServerError';
export declare class MethodNotImplementedError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    constructor();
}
