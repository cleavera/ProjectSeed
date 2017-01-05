import {IRoutingContext} from '../interfaces/IRoutingContext';
import {DomainEvent} from './DomainEvent';

export abstract class ResourceEvent extends DomainEvent {
    context: IRoutingContext;

    constructor(context: IRoutingContext) {
        super();

        this.context = context;
    }

    serialise(): any {
        let out = super.serialise();

        out.resourceName = this.context.resourceName;
        out.resourceId = this.context.id;

        out.links = {
          self: this.context.generateUrl()
        };

        return out;
    }
}
