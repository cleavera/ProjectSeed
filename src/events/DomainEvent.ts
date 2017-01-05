import {IEvent} from '../packages/Interfaces';

export abstract class DomainEvent implements IEvent {
    serialise(): any {
        return {
            event: this.constructor.name,
            timestamp: new Date().toISOString()
        };
    }
}
