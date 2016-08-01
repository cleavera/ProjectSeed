import {IAuthoriser, IRequest} from '../src/packages/Interfaces';

export class Auth implements IAuthoriser {
    authorise(request: IRequest): boolean {
        let headers: {authorization: string} = request.headers;

        return headers.authorization === 'true';
    }
}
