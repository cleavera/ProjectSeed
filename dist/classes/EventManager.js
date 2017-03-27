"use strict";
class EventManager {
    constructor() {
        this.subscribers = [];
    }
    emit(event) {
        this.subscribers.forEach(subscriber => {
            subscriber(event);
        });
    }
    subscribe(cb) {
        this.subscribers.push(cb);
        return () => {
            this.subscribers.splice(this.subscribers.indexOf(cb), 1);
        };
    }
}
exports.EventManager = EventManager;
