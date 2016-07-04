"use strict";
var Json_node_1 = require('./Json.node');
var ServerError_node_1 = require('../errors/ServerError.node');
var Association = (function () {
    function Association() {
    }
    Association.removeAssociation = function (context, parentContext) {
        if (!context && !parentContext) {
            return;
        }
        var associations = this._getAssociations();
        var currentAssociations = associations.filter(function (association) {
            var isCorrectParentContext = parentContext
                ? (association.parent === parentContext.resourceName
                    && association.parentId === parentContext.id) : true;
            var isCorrectChildContext = context
                ? (association.child === context.resourceName
                    && association.childId === context.id) : true;
            return isCorrectParentContext && isCorrectChildContext;
        });
        currentAssociations.forEach(function (association) {
            associations.splice(associations.indexOf(association));
        });
    };
    Association.addAssociation = function (context, parentContext) {
        var associations = this._getAssociations();
        var currentAssociations = associations.filter(function (association) {
            var isCorrectParentContext = association.parent === parentContext.resourceName && association.parentId === parentContext.id;
            return isCorrectParentContext && association.child === context.resourceName && association.childId === context.id;
        });
        if (currentAssociations.length) {
            return;
        }
        associations.push({ child: context.resourceName, childId: context.id, parent: parentContext.resourceName, parentId: parentContext.id });
    };
    Association.filter = function (context, parentContext, data) {
        var associations = this._getAssociations(), ids = Object.keys(data), out = {};
        associations.forEach(function (association) {
            var isCorrectParentContext = association.parent === parentContext.resourceName && association.parentId === parentContext.id;
            if (isCorrectParentContext && association.child === context.resourceName && ids.indexOf(association.childId) > -1) {
                out[association.childId] = data[association.childId];
            }
        });
        return out;
    };
    Association._getAssociations = function () {
        try {
            return new Json_node_1.Json('./data/private/association.json').read();
        }
        catch (e) {
            throw new ServerError_node_1.ServerError();
        }
    };
    return Association;
}());
exports.Association = Association;
