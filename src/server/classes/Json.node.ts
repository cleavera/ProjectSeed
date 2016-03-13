import * as fs from 'fs';
import {IResource} from '../interfaces/IResource';
import {DatabaseError} from '../errors/DatabaseError.node';

export class Json implements IResource {
    private _path: string;

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
        return JSON.parse(fs.readFileSync(this._path).toJSON());
    }

    remove(): void {
        fs.writeFileSync(this._path, '');
    }
}
