import { IEvent, IEventManager } from '../packages/Interfaces';
export declare class EventManager implements IEventManager {
    private subscribers;
    constructor();
    emit(event: IEvent): void;
    subscribe(cb: (event: IEvent) => void): () => void;
}
