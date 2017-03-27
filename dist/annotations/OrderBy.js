"use strict";
function OrderBy(fieldName, reverse) {
    'use strict';
    return function (model) {
        model._orderBy = function (data) {
            if (!data.length) {
                return data;
            }
            data.sort((a, b) => {
                if (isNaN(a.attributes[fieldName])) {
                    if (a.attributes[fieldName] < b.attributes[fieldName]) {
                        return reverse ? 1 : -1;
                    }
                    if (a.attributes[fieldName] > b.attributes[fieldName]) {
                        return reverse ? -1 : 1;
                    }
                    return 0;
                }
                if (reverse) {
                    return b.attributes[fieldName] - a.attributes[fieldName];
                }
                return a.attributes[fieldName] - b.attributes[fieldName];
            });
        };
    };
}
exports.OrderBy = OrderBy;
