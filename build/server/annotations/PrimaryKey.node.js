"use strict";
function PrimaryKey(field) {
    'use strict';
    return function (target) {
        target.primaryKey = field;
    };
}
exports.PrimaryKey = PrimaryKey;
