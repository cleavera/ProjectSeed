"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Resource_node_1 = require('../classes/Resource.node');
var UserResource = (function (_super) {
    __extends(UserResource, _super);
    function UserResource() {
        _super.call(this, 'User');
    }
    UserResource._stripPasswordField = function (item) {
        if (item.hasOwnProperty('password')) {
            delete item.password;
        }
    };
    UserResource.prototype.get = function (id) {
        var data = _super.prototype.get.call(this, id);
        if (id) {
            UserResource._stripPasswordField(data);
        }
        else {
            for (var uid in data) {
                if (data.hasOwnProperty(uid)) {
                    UserResource._stripPasswordField(data[uid]);
                }
            }
        }
        return data;
    };
    return UserResource;
}(Resource_node_1.Resource));
exports.UserResource = UserResource;
