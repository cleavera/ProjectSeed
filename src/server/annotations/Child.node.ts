export function Child(childModel: any): ClassDecorator {
    'use strict';

    return function(model: any): void {
        if (!model._children) {
            model._children = [];
        }

        model._children.push(childModel);
    };
}
