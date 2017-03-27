"use strict";
const Helpers_1 = require('../packages/Helpers');
const DefaultResource_1 = require('./DefaultResource');
const DefaultRestService_1 = require('./DefaultRestService');
class DefaultModel {
    get isValid() {
        return !Object.keys(this._errors).length;
    }
    static addValidator(model, validatorName, validator, field) {
        if (!model._errors) {
            model._errors = {};
        }
        if (!model._errors[field]) {
            model._errors[field] = [];
        }
        let setter = function (newValue) {
            let errorArray = this._errors[field] || [], errorIndex = errorArray ? errorArray.indexOf(validatorName) : -1;
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
        Helpers_1.DecorateField.getterSetter(model, field, null, setter);
    }
    static generateLinks(context) {
        let links = {
            self: {
                href: context.generateUrl()
            }
        };
        if (context.parent) {
            links.parent = {
                href: context.parent.generateUrl()
            };
        }
        return links;
    }
}
DefaultModel.resource = DefaultResource_1.DefaultResource;
DefaultModel.restService = DefaultRestService_1.DefaultRestService;
exports.DefaultModel = DefaultModel;
