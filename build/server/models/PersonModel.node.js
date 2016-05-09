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
var DefaultModel_node_1 = require('./DefaultModel.node');
var Map_node_1 = require('../annotations/Map.node');
var PrimaryKey_node_1 = require('../annotations/PrimaryKey.node');
var Required_node_1 = require('../annotations/Required.node');
var Description_node_1 = require('../annotations/Description.node');
var String_node_1 = require('../annotations/String.node');
var Integer_node_1 = require('../annotations/Integer.node');
var Guid_node_1 = require('../annotations/Guid.node');
var Options_node_1 = require('../annotations/Options.node');
var MaxLength_node_1 = require('../annotations/MaxLength.node');
var NumberRange_node_1 = require('../annotations/NumberRange.node');
var Decimal_node_1 = require('../annotations/Decimal.node');
var gender_node_1 = require('../constants/gender.node');
var PersonModel = (function (_super) {
    __extends(PersonModel, _super);
    function PersonModel(data, id) {
        _super.call(this);
        this.id = id;
        this.name = data.name;
        this.age = data.age;
        this.gender = data.gender;
        this.height = data.height;
    }
    __decorate([
        Guid_node_1.Guid,
        PrimaryKey_node_1.PrimaryKey
    ], PersonModel.prototype, "id", void 0);
    __decorate([
        String_node_1.String,
        Required_node_1.Required,
        MaxLength_node_1.MaxLength(20),
        Description_node_1.Description('The name of the person')
    ], PersonModel.prototype, "name", void 0);
    __decorate([
        Integer_node_1.Integer,
        NumberRange_node_1.NumberRange(0, 99),
        Description_node_1.Description('The age of the person')
    ], PersonModel.prototype, "age", void 0);
    __decorate([
        Options_node_1.Options(gender_node_1.GENDER),
        String_node_1.String,
        Description_node_1.Description('The gender of the person')
    ], PersonModel.prototype, "gender", void 0);
    __decorate([
        Decimal_node_1.Decimal(2),
        Description_node_1.Description('The height of the person in meters')
    ], PersonModel.prototype, "height", void 0);
    PersonModel = __decorate([
        Description_node_1.Description('People'),
        Map_node_1.Map('Person', {
            age: 'age',
            id: 'id',
            name: 'fullName'
        })
    ], PersonModel);
    return PersonModel;
}(DefaultModel_node_1.DefaultModel));
exports.PersonModel = PersonModel;
