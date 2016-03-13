"use strict";
function PrimaryKey(field) {
    'use strict';
    return function (target) {
        target._primaryKey = field;
    };
}
exports.PrimaryKey = PrimaryKey;
