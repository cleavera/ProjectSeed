import {IUrl} from './IUrl';

export interface IRequest {
    url: IUrl;

    body: any;

    type: string;

    method: string;

    isJSON: boolean;

    isPost: boolean;

    isPut: boolean;

    isGet: boolean;

    isDelete: boolean;

    isOptions: boolean;
}
