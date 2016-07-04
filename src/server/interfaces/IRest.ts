import {IRoutingContext} from './IRoutingContext';
export interface IRest {
    get(id?: string, context?: IRoutingContext): any;

    post(item: any): any;

    put(id: string, item: any): any;

    delete(id: string): void;

    options?(): void;
}
