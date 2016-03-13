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
var PrimaryKey_node_1 = require('../annotations/PrimaryKey.node');
var Map_node_1 = require('../annotations/Map.node');
var Model_node_1 = require('../classes/Model.node');
var UserResource_node_1 = require('../resources/UserResource.node');
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
    UserModel = __decorate([
        PrimaryKey_node_1.PrimaryKey('id'),
        Map_node_1.Map('User', {
            email: 'email',
            id: 'id',
            password: 'password',
            username: 'username'
        })
    ], UserModel);
    return UserModel;
}(Model_node_1.Model));
exports.UserModel = UserModel;
