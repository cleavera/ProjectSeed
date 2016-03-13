import {IUrl} from '../interfaces/IUrl';
import {IIteratorResult} from '../interfaces/IIteratorResult';

export class Url implements IUrl {
    url: string;

    parts: Array<string>;

    params: Object;

    path: string;

    queryString: string;

    private _pointer: number = -1;

    constructor(url: string) {
        let urlParts: Array<string> = url.split('?'),
            pathParts: Array<string> = urlParts[0].split('/');

        this.url = url;
        this.path = urlParts[0];
        this.queryString = urlParts[1];
        this.parts = pathParts.slice(1, pathParts.length);
        this.params = {};

        if (urlParts[1]) {
            let params: Array<string> = urlParts[1].split('&');

            params.forEach(param => {
                let keyValue: Array<string> = param.split('=');

                this.params[keyValue[0]] = keyValue[1];
            });
        }
    }

    toString(): string {
        return this.url;
    }

    get current(): string {
        return this.parts[this._pointer];
    }

    next(): IIteratorResult {
        if (this._pointer < this.parts.length) {
            this._pointer++;
        }

        if (this._pointer < this.parts.length) {
            return {
                done: false,
                value: this.current
            };
        }

        return {
            done: true
        };
    }
}
