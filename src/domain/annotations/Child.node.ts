export function Child(childModel: any, alias: string): ClassDecorator {
    'use strict';

    return function(model: any): void {
        if (!model._children) {
            model._children = {};
        }

        model._children[alias.toLowerCase()] = childModel;
    };
}
