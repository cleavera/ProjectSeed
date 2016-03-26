import {IUrl} from './IUrl';

export interface IRequest {
    url: IUrl;

    body: any;
    
    type: string;

    isPost: boolean;

    isPut: boolean;

    isGet: boolean;

    isDelete: boolean;
}
