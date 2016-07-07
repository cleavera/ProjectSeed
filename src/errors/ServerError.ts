import {IServerError} from '../packages/Interfaces';

export class ServerError implements IServerError {
    stack: string;

    statusCode: number;

    name: string;

    message: string;

    constructor() {
        this.stack = new Error().stack;
    }

    serialise(): any {
        return {
            message: this.message,
            name: this.name
        };
    };
}
