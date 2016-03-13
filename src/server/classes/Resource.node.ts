import {IRest} from '../interfaces/IRest';
import {IResource} from '../interfaces/IResource';
import {Json} from './Json.node';
import {Guid} from '../services/Guid.node';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';

export class Resource implements IRest {
    private _data: any;

    private _resource: IResource;

    private _resourceName: string;

    constructor(resourceName: string) {
        this._resourceName = resourceName;

        try {
            this._resource = new Json('./data/' + resourceName + '.json');
        } catch (e) {
            throw new ResourceNotFoundRoutingError(resourceName, resourceName);
        }

        this._data = this._resource.read();
    }

    get(id?: string): any {
        if (id) {
            if (this._data[id]) {
                return this._data[id];
            } else {
                throw new ResourceNotFoundRoutingError(id, this._resourceName);
            }
        } else {
            return this._data;
        }
    }

    post(item: any): any {
        let id: string = Guid.generate();

        this._data[id] = item;
        this._resource.save(this._data);

        return this._data[id];
    }

    put(id: string, item: any): any {
        this._data[id] = item;
        this._resource.save(this._data);

        return this._data[id];
    }

    delete(id: string): any {
        delete this._data[id];
        this._resource.save(this._data);

        return {};
    }
}
