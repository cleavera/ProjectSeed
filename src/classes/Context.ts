import {IRest, IRoutingContext} from '../packages/Interfaces';
import {DefaultModel} from './DefaultModel';

export class Context implements IRoutingContext {
    id: string;

    Model: typeof DefaultModel;

    parent: IRoutingContext;

    resourceName: string;

    restService: IRest;

    constructor(resourceName: string, id?: string, Model?: typeof DefaultModel, restService?: IRest, parent?: IRoutingContext) {
        this.id = id;
        this.resourceName = resourceName;
        this.Model = Model;
        this.restService = restService;
        this.parent = parent;
    }

    generateUrl(): string {
        let recursiveSearch: (context: IRoutingContext) => string = function (context: IRoutingContext): string {
            let url: string = '';

            if (context.parent) {
                url = recursiveSearch(context.parent);
            }

            url += '/' + context.resourceName;

            if (context.id) {
                url += '/' + context.id;
            }

            return url;
        };

        return recursiveSearch(this);
    }
}
