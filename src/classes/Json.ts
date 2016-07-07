import * as fs from 'fs';
import {IResource} from '../packages/Interfaces';
import {DatabaseError} from '../packages/Errors';

export class Json implements IResource {
    private _path: string;

    static tableExists(path: string): boolean {
        try {
            fs.accessSync(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    static create(path: string): void {
        fs.writeFile(path, '{}', (err) => {
            throw new DatabaseError(path, 'Error creating table', err);
        });
    }

    constructor(path: string) {
        this._path = path;
        fs.accessSync(path);
    }

    save(json: Object): void {
        fs.writeFileSync(this._path, JSON.stringify(json));
    }

    read(): any {
        return JSON.parse(fs.readFileSync(this._path).toString());
    }

    remove(): void {
        fs.writeFileSync(this._path, '');
    }
}
