"use strict";
var Resource_node_1 = require('./Resource.node');
var DefaultRestService_node_1 = require('../restServices/DefaultRestService.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
var Model = (function () {
    function Model() {
    }
    Object.defineProperty(Model.prototype, "isValid", {
        get: function () {
            return !Object.keys(this._errors).length;
        },
        enumerable: true,
        configurable: true
    });
    Model.addValidator = function (model, validatorName, validator, field) {
        if (!model._errors) {
            model._errors = {};
        }
        if (!model._errors[field]) {
            model._errors[field] = [];
        }
        var setter = function (newValue) {
            var errorArray = this._errors[field] || [], errorIndex = errorArray ? errorArray.indexOf(validatorName) : -1;
            if (!errorArray) {
                this._errors[field] = errorArray;
            }
            if (!validator(newValue, model[field]) && errorIndex === -1) {
                errorArray.push(validatorName);
                this._errors[field] = errorArray;
                return model[field];
            }
            if (validator(newValue, model[field]) && errorIndex !== -1) {
                errorArray.splice(errorIndex, 1);
            }
            if (!errorArray.length) {
                delete this._errors[field];
            }
            return newValue;
        };
        DecorateField_node_1.DecorateField.getterSetter(model, field, null, setter);
    };
    Model.resource = Resource_node_1.Resource;
    Model.restService = DefaultRestService_node_1.DefaultRestService;
    return Model;
}());
exports.Model = Model;
