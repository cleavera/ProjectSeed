"use strict";
const Helpers_1 = require('../packages/Helpers');
function ForeignKey(target, key) {
    'use strict';
    const typeName = 'foreignKey';
    Helpers_1.DecorateField.addType(target, key, typeName);
}
exports.ForeignKey = ForeignKey;
