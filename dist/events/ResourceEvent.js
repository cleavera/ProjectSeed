"use strict";
const DomainEvent_1 = require('./DomainEvent');
class ResourceEvent extends DomainEvent_1.DomainEvent {
    constructor(context) {
        super();
        this.context = context;
    }
    serialise() {
        let out = super.serialise();
        out.resourceName = this.context.resourceName;
        out.resourceId = this.context.id;
        out.links = {
            self: this.context.generateUrl()
        };
        return out;
    }
}
exports.ResourceEvent = ResourceEvent;
