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
                ? (association.parent === parentContext.Model._map.table
                    && association.parentId === parentContext.id) : true;
            let isCorrectChildContext = context
                ? (association.child === context.Model._map.table
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
            let isCorrectParentContext = association.parent === parentContext.Model._map.table && association.parentId === parentContext.id;
            return isCorrectParentContext && association.child === context.Model._map.table && association.childId === context.id;
        });
        if (currentAssociations.length) {
            return;
        }
        associations.push({ child: context.Model._map.table, childId: context.id, parent: parentContext.Model._map.table, parentId: parentContext.id });
        new Json_1.Json(Root.dataLocation + '/private/association.json').save(associations);
    }
    static filter(context, parentContext, data, Root) {
        let associations = this._getAssociations(Root), ids = Object.keys(data), out = {};
        associations.forEach(association => {
            let isCorrectParentContext = association.parent === parentContext.Model._map.table && association.parentId === parentContext.id;
            if (isCorrectParentContext && association.child === context.Model._map.table && ids.indexOf(association.childId) > -1) {
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
