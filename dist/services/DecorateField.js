"use strict";
class DecorateField {
    static addDescriptor(instance, field, descriptorName, value) {
        let staticClass = instance.constructor;
        if (!staticClass._fields) {
            staticClass._fields = {};
        }
        if (!staticClass._fields[field]) {
            staticClass._fields[field] = {};
        }
        staticClass._fields[field][descriptorName] = value;
    }
    static addType(instance, field, type) {
        this.addDescriptor(instance, field, 'type', type);
    }
    static setPrimaryKey(instance, field) {
        let staticClass = instance.constructor;
        staticClass.primaryKey = field;
        this.addDescriptor(instance, field, 'primaryKey', true);
    }
    static getterSetter(object, key, onGet, onSet) {
        let descriptor = Object.getOwnPropertyDescriptor(object, key);
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
            let oldGet = descriptor.get;
            descriptor.get = function () {
                return onGet.call(this, oldGet.call(this));
            };
        }
        if (onSet) {
            let oldSet = descriptor.set;
            descriptor.set = function (newValue) {
                oldSet.call(this, onSet.call(this, newValue));
            };
        }
        Object.defineProperty(object, key, descriptor);
    }
}
exports.DecorateField = DecorateField;
