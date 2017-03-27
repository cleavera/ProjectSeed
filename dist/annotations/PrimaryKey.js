"use strict";
const Helpers_1 = require('../packages/Helpers');
function PrimaryKey(target, key) {
    'use strict';
    Helpers_1.DecorateField.setPrimaryKey(target, key);
}
exports.PrimaryKey = PrimaryKey;
