import { IIteratorResult } from './IIteratorResult';
export interface IUrl {
    url: string;
    current: string;
    parts: Array<string>;
    path: string;
    queryString: string;
    params: Object;
    next(): IIteratorResult;
}
