import {IRoutingContext} from '../interfaces/IRoutingContext';
import {Context} from '../classes/Context.node';
import {noop} from '../services/noop.node';

export function Child(childModel: any, alias: string): ClassDecorator {
    'use strict';

    return function(model: any): void {
        if (!model._children) {
            model._children = {};

            let oldFunction: (context: IRoutingContext) => any = model.prototype.generateLinks || noop;

            model.prototype.generateLinks = function(context: IRoutingContext): any {
                let links: any = oldFunction.apply(this, arguments) || {};

                Object.keys(model._children).forEach(child => {
                    let childContext: IRoutingContext = new Context(child, null, model._children[child], null, context);

                    links[child] = {
                        href: childContext.generateUrl()
                    };
                });

                return links;
            };
        }

        model._children[alias.toLowerCase()] = childModel;
    };
}
