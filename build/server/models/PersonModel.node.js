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
var Model_node_1 = require('../classes/Model.node');
var Map_node_1 = require('../annotations/Map.node');
var PrimaryKey_node_1 = require('../annotations/PrimaryKey.node');
var Required_node_1 = require('../annotations/Required.node');
var Description_node_1 = require('../annotations/Description.node');
var String_node_1 = require('../annotations/String.node');
var Integer_node_1 = require('../annotations/Integer.node');
var Guid_node_1 = require('../annotations/Guid.node');
var Options_node_1 = require('../annotations/Options.node');
var gender_node_1 = require('../constants/gender.node');
var PersonModel = (function (_super) {
    __extends(PersonModel, _super);
    function PersonModel(data, id) {
        _super.call(this);
        this.id = id;
        this.name = data.name;
        this.age = data.age;
    }
    __decorate([
        Guid_node_1.Guid,
        PrimaryKey_node_1.PrimaryKey
    ], PersonModel.prototype, "id", void 0);
    __decorate([
        Required_node_1.Required,
        String_node_1.String
    ], PersonModel.prototype, "name", void 0);
    __decorate([
        Integer_node_1.Integer
    ], PersonModel.prototype, "age", void 0);
    __decorate([
        Options_node_1.Options(gender_node_1.Gender),
        String_node_1.String
    ], PersonModel.prototype, "gender", void 0);
    PersonModel = __decorate([
        Description_node_1.Description('People'),
        Map_node_1.Map('Person', {
            age: 'age',
            id: 'id',
            name: 'fullName'
        })
    ], PersonModel);
    return PersonModel;
}(Model_node_1.Model));
exports.PersonModel = PersonModel;
