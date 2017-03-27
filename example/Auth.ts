import {IAuthoriser, IRequest} from '../dist/packages/Interfaces';

export class Auth implements IAuthoriser {
    authorise(request: IRequest): boolean {
        let headers: {authorization: string} = request.headers;

        return headers.authorization === 'true';
    }
}
