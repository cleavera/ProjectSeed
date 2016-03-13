export class ServerError {
    stack: string;

    constructor() {
        this.stack = new Error().stack;
    }
}
