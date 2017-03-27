"use strict";
const Errors_1 = require('../packages/Errors');
const Json_1 = require('./Json');
class Association {
    static removeAssociation(context, Root, parentContext) {
        if (!context && !parentContext) {
            return;
        }
        let associations = this._getAssociations(Root);
        let currentAssociations = associations.filter(association => {
            let isCorrectParentContext = parentContext
                ? (association.parent === parentContext.resourceName
                    && association.parentId === parentContext.id) : true;
            let isCorrectChildContext = context
                ? (association.child === context.resourceName
                    && association.childId === context.id) : true;
            return isCorrectParentContext && isCorrectChildContext;
        });
        currentAssociations.forEach(association => {
            associations.splice(associations.indexOf(association));
        });
        new Json_1.Json(Root.dataLocation + '/private/association.json').save(associations);
    }
    static addAssociation(context, parentContext, Root) {
        let associations = this._getAssociations(Root);
        let currentAssociations = associations.filter(association => {
            let isCorrectParentContext = association.parent === parentContext.resourceName && association.parentId === parentContext.id;
            return isCorrectParentContext && association.child === context.resourceName && association.childId === context.id;
        });
        if (currentAssociations.length) {
            return;
        }
        associations.push({ child: context.resourceName, childId: context.id, parent: parentContext.resourceName, parentId: parentContext.id });
        new Json_1.Json(Root.dataLocation + '/private/association.json').save(associations);
    }
    static filter(context, parentContext, data, Root) {
        let associations = this._getAssociations(Root), ids = Object.keys(data), out = {};
        associations.forEach(association => {
            let isCorrectParentContext = association.parent === parentContext.resourceName && association.parentId === parentContext.id;
            if (isCorrectParentContext && association.child === context.resourceName && ids.indexOf(association.childId) > -1) {
                out[association.childId] = data[association.childId];
            }
        });
        return out;
    }
    static _getAssociations(Root) {
        try {
            return new Json_1.Json(Root.dataLocation + '/private/association.json').read();
        }
        catch (e) {
            throw new Errors_1.ServerError();
        }
    }
}
exports.Association = Association;
