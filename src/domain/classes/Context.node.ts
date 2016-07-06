import {IRest} from '../interfaces/IRest';
import {IRoutingContext} from '../interfaces/IRoutingContext';
import {DefaultModel} from '../models/DefaultModel.node';

export class Context implements IRoutingContext {
    id: string;

    Model: typeof DefaultModel;

    parent: IRoutingContext;

    resourceName: string;

    restService: IRest;

    constructor(id: string, resourceName: string, Model?: typeof DefaultModel, restService?: IRest, parent?: IRoutingContext) {
        this.id = id;
        this.resourceName = resourceName;
        this.Model = Model;
        this.restService = restService;
        this.parent = parent;
    }
}
