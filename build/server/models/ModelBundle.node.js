"use strict";
var PersonModel_node_1 = require('./PersonModel.node');
var UserModel_node_1 = require('./UserModel.node');
var ModelBundle = (function () {
    function ModelBundle() {
        this.person = PersonModel_node_1.PersonModel;
        this.user = UserModel_node_1.UserModel;
    }
    return ModelBundle;
}());
exports.ModelBundle = ModelBundle;
