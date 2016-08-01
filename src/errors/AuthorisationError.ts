import {ServerError} from './ServerError';

export class AuthorisationError extends ServerError {
    name: string = 'AuthorisationError';

    message: string = 'You are not authorised to view that';

    statusCode: number = 401;

    underlyingError: any;

    constructor() {
        super();
    }
}
