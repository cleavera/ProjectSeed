import {IUrl} from './IUrl';

export interface IRequest {
    url: IUrl;

    body: any;

    isPost: boolean;

    isPut: boolean;

    isGet: boolean;

    isDelete: boolean;
}
