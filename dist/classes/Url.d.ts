import { IIteratorResult, IUrl } from '../packages/Interfaces';
export declare class Url implements IUrl {
    url: string;
    parts: Array<string>;
    params: Object;
    path: string;
    queryString: string;
    private _pointer;
    constructor(url: string);
    toString(): string;
    current: string;
    next(): IIteratorResult;
}
