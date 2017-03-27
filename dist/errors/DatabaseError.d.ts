import { ServerError } from './ServerError';
export declare class DatabaseError extends ServerError {
    name: string;
    message: string;
    table: string;
    statusCode: number;
    underlyingError: any;
    constructor(table: string, message: string, underlyingError: any);
}
