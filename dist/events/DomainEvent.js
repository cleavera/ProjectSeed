"use strict";
class DomainEvent {
    serialise() {
        return {
            event: this.constructor.name,
            timestamp: new Date().toISOString()
        };
    }
}
exports.DomainEvent = DomainEvent;
