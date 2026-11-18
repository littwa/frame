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
exports.ScreenshotSchema = exports.Screenshot = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const screenshot_enum_1 = require("../../shared/enums/screenshot.enum");
let Screenshot = class Screenshot extends mongoose_1.Document {
};
exports.Screenshot = Screenshot;
__decorate([
    (0, mongoose_2.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Screenshot.prototype, "index", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Screenshot.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, enum: screenshot_enum_1.EScreenshotType, default: screenshot_enum_1.EScreenshotType.Other }),
    __metadata("design:type", String)
], Screenshot.prototype, "type", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Screenshot.prototype, "url", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Screenshot.prototype, "public_id", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Screenshot.prototype, "essential", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Screenshot.prototype, "data", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true }),
    __metadata("design:type", Date)
], Screenshot.prototype, "created", void 0);
exports.Screenshot = Screenshot = __decorate([
    (0, mongoose_2.Schema)()
], Screenshot);
exports.ScreenshotSchema = mongoose_2.SchemaFactory.createForClass(Screenshot);
//# sourceMappingURL=screenshot.schema.js.map