import {IResponse} from './IResponse';
import {IRequest} from './IRequest';

export interface IRouter {
    route(request: IRequest, response: IResponse): void;
}
