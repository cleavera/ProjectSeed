"use strict";
var Model_node_1 = require('../classes/Model.node');
function Readonly(target, key) {
    'use strict';
    var validatorName = 'readonly';
    var validator = function (newValue, oldValue) {
        return newValue === oldValue;
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Readonly = Readonly;
