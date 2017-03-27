"use strict";
const Classes_1 = require('../packages/Classes');
const Helpers_1 = require('../packages/Helpers');
function Child(childModel, alias) {
    'use strict';
    return function (model) {
        if (!model._children) {
            model._children = {};
            let oldFunction = model.generateLinks || Helpers_1.noop;
            model.generateLinks = function (context) {
                let links = oldFunction.apply(this, arguments) || {};
                if (!context || context.id) {
                    Object.keys(model._children).forEach(child => {
                        let childContext = new Classes_1.Context(child, null, model._children[child], null, context);
                        links[child] = {
                            href: childContext.generateUrl()
                        };
                    });
                }
                return links;
            };
        }
        model._children[alias.toLowerCase()] = childModel;
    };
}
exports.Child = Child;
