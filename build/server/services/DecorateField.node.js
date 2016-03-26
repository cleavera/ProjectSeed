"use strict";
var DecorateField = (function () {
    function DecorateField() {
    }
    DecorateField.addDescriptor = function (instance, field, descriptorName, value) {
        var staticClass = instance.constructor;
        if (!staticClass._fields) {
            staticClass._fields = {};
        }
        if (!staticClass._fields[field]) {
            staticClass._fields[field] = {};
        }
        staticClass._fields[field][descriptorName] = value;
    };
    DecorateField.addType = function (instance, field, type) {
        this.addDescriptor(instance, field, 'type', type);
    };
    DecorateField.getterSetter = function (object, key, onGet, onSet) {
        var descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (!descriptor) {
            descriptor = {
                configurable: true
            };
        }
        if (!descriptor.get) {
            descriptor.get = function () {
                if (!this._backingFields) {
                    this._backingFields = {};
                }
                return this._backingFields[key];
            };
            descriptor.set = function (newValue) {
                if (!this._backingFields) {
                    this._backingFields = {};
                }
                this._backingFields[key] = newValue;
            };
        }
        if (onGet) {
            var oldGet_1 = descriptor.get;
            descriptor.get = function () {
                return onGet.call(this, oldGet_1.call(this));
            };
        }
        if (onSet) {
            var oldSet_1 = descriptor.set;
            descriptor.set = function (newValue) {
                oldSet_1.call(this, onSet.call(this, newValue));
            };
        }
        Object.defineProperty(object, key, descriptor);
    };
    return DecorateField;
}());
exports.DecorateField = DecorateField;
