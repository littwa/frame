"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotListSchema = exports.ScreenshotList = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
let ScreenshotList = class ScreenshotList extends mongoose_1.Document {
};
exports.ScreenshotList = ScreenshotList;
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ScreenshotList.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], ScreenshotList.prototype, "public_id_screenshots", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Screenshot' }] }),
    __metadata("design:type", Array)
], ScreenshotList.prototype, "screenshots", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], ScreenshotList.prototype, "author", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true }),
    __metadata("design:type", Date)
], ScreenshotList.prototype, "created", void 0);
exports.ScreenshotList = ScreenshotList = __decorate([
    (0, mongoose_2.Schema)()
], ScreenshotList);
exports.ScreenshotListSchema = mongoose_2.SchemaFactory.createForClass(ScreenshotList);
//# sourceMappingURL=screenshot-list.schema.js.map