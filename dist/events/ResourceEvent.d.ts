import { IRoutingContext } from '../interfaces/IRoutingContext';
import { DomainEvent } from './DomainEvent';
export declare abstract class ResourceEvent extends DomainEvent {
    context: IRoutingContext;
    constructor(context: IRoutingContext);
    serialise(): any;
}
