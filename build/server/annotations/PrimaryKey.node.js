"use strict";
var DecorateField_node_1 = require('../services/DecorateField.node');
function PrimaryKey(target, key) {
    'use strict';
    DecorateField_node_1.DecorateField.setPrimaryKey(target, key);
}
exports.PrimaryKey = PrimaryKey;
