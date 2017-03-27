import { ServerError } from './ServerError';
export declare class InvalidJsonError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    json: string;
    constructor(json: string);
}
