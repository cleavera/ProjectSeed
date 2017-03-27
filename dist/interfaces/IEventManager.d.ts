import { IEvent } from './IEvent';
export interface IEventManager {
    emit(event: IEvent): void;
    subscribe(cb: (event: IEvent) => void): () => void;
}
