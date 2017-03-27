import { IResource } from '../packages/Interfaces';
export declare class Json implements IResource {
    private _path;
    static tableExists(path: string): boolean;
    static create(path: string, defaultContent?: string): void;
    constructor(path: string);
    save(json: Object): void;
    read(): any;
    remove(): void;
}
