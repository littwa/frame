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
exports.ExecuteTesterBodyDto = exports.ExecuteTesterQueryDto = exports.ExecuteTesterParamDto = exports.TesterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const tester_enum_1 = require("../../../shared/enums/tester.enum");
class TesterDto {
}
exports.TesterDto = TesterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TesterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TesterDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['a', 'b', 'c'] }),
    (0, class_validator_1.IsIn)(['a', 'b', 'c']),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TesterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['xxx', 'yyy', 'zzz'] }),
    (0, class_validator_1.IsIn)(['xxx', 'yyy', 'zzz']),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TesterDto.prototype, "distinct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['s', 'm', 'l', 'xl'] }),
    (0, class_validator_1.IsIn)(['s', 'm', 'l', 'xl']),
    __metadata("design:type", String)
], TesterDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [1, 2, 3] }),
    (0, class_validator_1.IsIn)([1, 2, 3]),
    __metadata("design:type", Number)
], TesterDto.prototype, "num", void 0);
class ExecuteTesterParamDto {
}
exports.ExecuteTesterParamDto = ExecuteTesterParamDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteTesterParamDto.prototype, "testerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['a', 'b', 'c'] }),
    (0, class_validator_1.IsIn)(['a', 'b', 'c']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExecuteTesterParamDto.prototype, "qwe", void 0);
class ExecuteTesterQueryDto {
}
exports.ExecuteTesterQueryDto = ExecuteTesterQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExecuteTesterQueryDto.prototype, "g", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['a', 'b', 'c'] }),
    (0, class_validator_1.IsIn)(['a', 'b', 'c']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExecuteTesterQueryDto.prototype, "h", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['s', 'm', 'l', 'xl'] }),
    (0, class_validator_1.IsIn)(['s', 'm', 'l', 'xl']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExecuteTesterQueryDto.prototype, "s", void 0);
class ExecuteTesterBodyDto {
}
exports.ExecuteTesterBodyDto = ExecuteTesterBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [1, 2, 3], example: 3 }),
    (0, class_validator_1.IsIn)([1, 2, 3]),
    __metadata("design:type", Number)
], ExecuteTesterBodyDto.prototype, "bodyF2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['a', 'b', 'c'] }),
    (0, class_validator_1.IsIn)(['a', 'b', 'c']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExecuteTesterBodyDto.prototype, "bodyF1", void 0);
//# sourceMappingURL=testers.dto.js.map