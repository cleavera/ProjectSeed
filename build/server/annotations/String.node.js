"use strict";
var Model_node_1 = require('../classes/Model.node');
function String(target, key) {
    'use strict';
    var validatorName = 'invalidString';
    var validator = function (newValue) {
        return newValue === undefined || typeof newValue === 'string';
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.String = String;
