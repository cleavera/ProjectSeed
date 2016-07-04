import {IRest} from '../interfaces/IRest';
import {IResource} from '../interfaces/IResource';
import {IRoutingContext} from '../interfaces/IRoutingContext';
import {Json} from '../classes/Json.node';
import {Guid} from '../services/Guid.node';
import {ResourceNotFoundRoutingError} from '../errors/ResourceNotFoundRoutingError.node';
import {Association} from '../classes/Association.node';

export class DefaultResource implements IRest {
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

    get(id?: string, parentContext?: IRoutingContext): any {
        let data: any;

        if (parentContext) {
            data = Association.filter({ id: id, resourceName: this._resourceName }, parentContext, this._data);
        } else {
            data = this._data;
        }

        if (id) {
            if (data[id]) {
                return data[id];
            } else {
                throw new ResourceNotFoundRoutingError(id, this._resourceName);
            }
        } else {
            return data;
        }
    }

    post(item: any, parentContext?: IRoutingContext): string {
        let id: string = Guid.generate();

        this._data[id] = item;
        this._resource.save(this._data);

        if (parentContext) {
            Association.addAssociation({ id: id, resourceName: this._resourceName }, parentContext);
        }

        return id;
    }

    put(id: string, item: any, parentContext?: IRoutingContext): any {
        this._data[id] = item;
        this._resource.save(this._data);

        if (parentContext) {
            Association.addAssociation({id: id, resourceName: this._resourceName}, parentContext);
        }

        return this._data[id];
    }

    delete(id: string): any {
        delete this._data[id];
        this._resource.save(this._data);

        Association.removeAssociation({ id: id, resourceName: this._resourceName });

        return {};
    }
}
