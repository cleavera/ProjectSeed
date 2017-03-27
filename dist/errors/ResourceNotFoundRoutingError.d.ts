import { ServerError } from './ServerError';
export declare class ResourceNotFoundRoutingError extends ServerError {
    name: string;
    message: string;
    statusCode: number;
    resource: string;
    url: string;
    constructor(url: string, resource: string);
}
