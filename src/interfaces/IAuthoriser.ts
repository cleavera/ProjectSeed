import {IRequest} from './IRequest';

export interface IAuthoriser {
    authorise(request: IRequest): boolean;
}
