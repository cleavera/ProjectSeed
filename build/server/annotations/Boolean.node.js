"use strict";
var Model_node_1 = require('../classes/Model.node');
function Boolean(target, key) {
    'use strict';
    var validatorName = 'invalidBoolean';
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'boolean');
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Boolean = Boolean;
