import { IEvent } from '../packages/Interfaces';
export declare abstract class DomainEvent implements IEvent {
    serialise(): any;
}
