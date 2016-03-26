"use strict";
var Model_node_1 = require('../classes/Model.node');
function Integer(target, key) {
    'use strict';
    var validatorName = 'invalidInteger';
    var validator = function (newValue) {
        return newValue === undefined || (typeof newValue === 'number' && Math.ceil(newValue) === newValue);
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Integer = Integer;
