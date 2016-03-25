export function Description(description: string): ClassDecorator {
    'use strict';

    return function(target: any): void {
        target.description = description;
    };
}
