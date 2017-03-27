import { ServerError } from './ServerError';
export declare class AuthorisationError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    underlyingError: any;
    constructor();
}
