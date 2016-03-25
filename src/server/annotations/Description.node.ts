export function Description(description: string): ClassDecorator {
    'use strict';

    return function(target: any): void {
        if (!target._meta) {
            target._meta = {};
        }

        target._meta.description = description;
    };
}
