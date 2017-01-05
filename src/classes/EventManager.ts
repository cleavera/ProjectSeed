import {IEvent, IEventManager} from '../packages/Interfaces';

export class EventManager implements IEventManager {
    private subscribers: ((event: IEvent)=> void)[];

    constructor() {
        this.subscribers = [];
    }

    emit(event: IEvent): void {
        this.subscribers.forEach(subscriber => {
            subscriber(event);
        });
    }

    subscribe(cb: (event: IEvent) => void): () => void {
        this.subscribers.push(cb);

        return () => {
            this.subscribers.splice(this.subscribers.indexOf(cb), 1);
        };
    }
}
