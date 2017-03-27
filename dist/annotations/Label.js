"use strict";
const Helpers_1 = require('../packages/Helpers');
function Label(target, key) {
    'use strict';
    Helpers_1.DecorateField.addDescriptor(target, key, 'label', true);
}
exports.Label = Label;
