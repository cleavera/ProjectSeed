import {IEventManager, IRest, IResource, IRoutingContext} from '../packages/Interfaces';
import {Guid} from '../packages/Helpers';
import {ResourceNotFoundRoutingError} from '../packages/Errors';
import {Association} from './Association';
import {Context} from './Context';
import {Json} from './Json';
import {ResourceCreatedEvent} from '../events/ResourceCreatedEvent';
import {ResourceDeletedEvent} from '../events/ResourceDeletedEvent';
import {ResourceUpdatedEvent} from '../events/ResourceUpdatedEvent';

export class DefaultResource implements IRest {
    private _data: any;

    private _Root: any;

    private _resource: IResource;

    private _resourceName: string;

    private _eventManger: IEventManager;

    private _parentContext: IRoutingContext;

    constructor(resourceName: string, Root: any, eventManager: IEventManager, parentContext?: IRoutingContext) {
        this._resourceName = resourceName;
        this._parentContext = parentContext;
        this._Root = Root;
        this._eventManger = eventManager;

        try {
            this._resource = new Json(Root.dataLocation + '/' + resourceName + '.json');
        } catch (e) {
            throw new ResourceNotFoundRoutingError(resourceName, resourceName);
        }

        this._data = this._resource.read();
    }

    get(id?: string): any {
        let data: any;

        if (this._parentContext) {
            data = Association.filter(new Context(this._resourceName, id), this._parentContext, this._data, this._Root);
        } else {
            data = this._data;
        }

        if (id) {
            if (data[id]) {
                return data[id];
            } else {
                throw new ResourceNotFoundRoutingError(this._resourceName, id);
            }
        } else {
            return data;
        }
    }

    post(item: any): string {
        let id: string = Guid.generate();

        this._data[id] = item;
        this._resource.save(this._data);

        let context = new Context(this._resourceName, id, null, null, this._parentContext);

        if (this._parentContext) {
            Association.addAssociation(context, this._parentContext, this._Root);
        }

        this._eventManger.emit(new ResourceCreatedEvent(context));

        return id;
    }

    put(id: string, item: any): any {
        this._data[id] = item;
        this._resource.save(this._data);

        let context = new Context(this._resourceName, id, null, null, this._parentContext);

        if (this._parentContext) {
            Association.addAssociation(context, this._parentContext, this._Root);
        }

        this._eventManger.emit(new ResourceUpdatedEvent(context));

        return this._data[id];
    }

    remove(id: string): any {
        delete this._data[id];
        this._resource.save(this._data);

        let context = new Context(this._resourceName, id, null, null, this._parentContext);

        Association.removeAssociation(context, this._Root);

        this._eventManger.emit(new ResourceDeletedEvent(context));

        return {};
    }
}
