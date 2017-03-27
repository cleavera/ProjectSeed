import { IServerError } from '../packages/Interfaces';
export declare class ServerError implements IServerError {
    stack: string;
    statusCode: number;
    name: string;
    message: string;
    constructor();
    serialise(): any;
}
