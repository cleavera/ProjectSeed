"use strict";
var DefaultResource_node_1 = require('../resources/DefaultResource.node');
var DefaultRestService_node_1 = require('../restServices/DefaultRestService.node');
var DecorateField_node_1 = require('../services/DecorateField.node');
var DefaultModel = (function () {
    function DefaultModel() {
    }
    Object.defineProperty(DefaultModel.prototype, "isValid", {
        get: function () {
            return !Object.keys(this._errors).length;
        },
        enumerable: true,
        configurable: true
    });
    DefaultModel.addValidator = function (model, validatorName, validator, field) {
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
    DefaultModel.resource = DefaultResource_node_1.DefaultResource;
    DefaultModel.restService = DefaultRestService_node_1.DefaultRestService;
    return DefaultModel;
}());
exports.DefaultModel = DefaultModel;
