"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Map_node_1 = require('../annotations/Map.node');
var DefaultModel_node_1 = require('./DefaultModel.node');
var UserResource_node_1 = require('../resources/UserResource.node');
var PrimaryKey_node_1 = require('../annotations/PrimaryKey.node');
var Required_node_1 = require('../annotations/Required.node');
var String_node_1 = require('../annotations/String.node');
var Guid_node_1 = require('../annotations/Guid.node');
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(data, id) {
        _super.call(this);
        this.id = id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }
    UserModel.resource = UserResource_node_1.UserResource;
    __decorate([
        PrimaryKey_node_1.PrimaryKey,
        Guid_node_1.Guid
    ], UserModel.prototype, "id", void 0);
    __decorate([
        Required_node_1.Required,
        String_node_1.String
    ], UserModel.prototype, "username", void 0);
    __decorate([
        Required_node_1.Required,
        String_node_1.String
    ], UserModel.prototype, "password", void 0);
    __decorate([
        Required_node_1.Required,
        String_node_1.String
    ], UserModel.prototype, "email", void 0);
    UserModel = __decorate([
        Map_node_1.Map('User', {
            email: 'email',
            id: 'id',
            password: 'password',
            username: 'username'
        })
    ], UserModel);
    return UserModel;
}(DefaultModel_node_1.DefaultModel));
exports.UserModel = UserModel;
