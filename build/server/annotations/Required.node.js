"use strict";
var Model_node_1 = require('../classes/Model.node');
function Required(target, key) {
    'use strict';
    var validatorName = 'required';
    var validator = function (newValue) {
        return !!newValue;
    };
    Model_node_1.Model.addValidator(target, validatorName, validator, key);
}
exports.Required = Required;
