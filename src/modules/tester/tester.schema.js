"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesterSchema = exports.Tester = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tester_enum_1 = require("../../shared/enums/tester.enum");
let Tester = class Tester extends mongoose_2.Document {
};
exports.Tester = Tester;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Tester.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Tester.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'a',
        enum: ['a', 'b', 'c'],
    }),
    __metadata("design:type", String)
], Tester.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'xxx',
        enum: ['xxx', 'yyy', 'zzz'],
    }),
    __metadata("design:type", String)
], Tester.prototype, "distinct", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: tester_enum_1.ETesterNum.One,
        enum: tester_enum_1.ETesterNum,
    }),
    __metadata("design:type", Number)
], Tester.prototype, "num", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: tester_enum_1.ETesterSize.L,
        enum: tester_enum_1.ETesterSize,
    }),
    __metadata("design:type", Number)
], Tester.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: Date.now() }),
    __metadata("design:type", Date)
], Tester.prototype, "dateCreated", void 0);
exports.Tester = Tester = __decorate([
    (0, mongoose_1.Schema)()
], Tester);
exports.TesterSchema = mongoose_1.SchemaFactory.createForClass(Tester);
//# sourceMappingURL=tester.schema.js.map