import {ServerError} from './ServerError';

export class InvalidJsonError extends ServerError {
    name: string = 'InvalidJsonError';

    message: string = 'An invalid json string was passed';

    statusCode: number = 400;

    json: string;

    constructor(json: string) {
        super();

        this.json = json;
    }
}
