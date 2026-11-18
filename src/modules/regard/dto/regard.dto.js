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
exports.CheckQualifyDto = exports.CreateQualifyDto = exports.UpdateTextDto = exports.TextDtoFind = exports.TextDto = exports.AddRegardDto = exports.ParamIdTextRegardQualifyDto = exports.ParamIdTextRegardDto = exports.ParamIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const regard_enum_1 = require("../../../shared/enums/regard.enum");
class ParamIdDto {
}
exports.ParamIdDto = ParamIdDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdDto.prototype, "id", void 0);
class ParamIdTextRegardDto {
}
exports.ParamIdTextRegardDto = ParamIdTextRegardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdTextRegardDto.prototype, "textId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdTextRegardDto.prototype, "regardId", void 0);
class ParamIdTextRegardQualifyDto {
}
exports.ParamIdTextRegardQualifyDto = ParamIdTextRegardQualifyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdTextRegardQualifyDto.prototype, "textId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdTextRegardQualifyDto.prototype, "regardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamIdTextRegardQualifyDto.prototype, "qualifyId", void 0);
class AddRegardDto {
}
exports.AddRegardDto = AddRegardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddRegardDto.prototype, "name", void 0);
class TextDto {
}
exports.TextDto = TextDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TextDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TextDto.prototype, "translation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TextDto.prototype, "synonyms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)([regard_enum_1.ETextType.Word, regard_enum_1.ETextType.Phrase, regard_enum_1.ETextType.Sentence]),
    __metadata("design:type", String)
], TextDto.prototype, "type", void 0);
class TextDtoFind {
}
exports.TextDtoFind = TextDtoFind;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TextDtoFind.prototype, "content", void 0);
class UpdateTextDto {
}
exports.UpdateTextDto = UpdateTextDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTextDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateTextDto.prototype, "synonyms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateTextDto.prototype, "translation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)([regard_enum_1.ETextType.Word, regard_enum_1.ETextType.Phrase, regard_enum_1.ETextType.Sentence]),
    __metadata("design:type", String)
], UpdateTextDto.prototype, "type", void 0);
class CreateQualifyDto {
}
exports.CreateQualifyDto = CreateQualifyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)([regard_enum_1.EQualifyType.Translate, regard_enum_1.EQualifyType.TranslateReverse]),
    __metadata("design:type", String)
], CreateQualifyDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    __metadata("design:type", Number)
], CreateQualifyDto.prototype, "repeat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)([regard_enum_1.EQualifyAnswers.Global, regard_enum_1.EQualifyAnswers.InQualify, regard_enum_1.EQualifyAnswers.Local, regard_enum_1.EQualifyAnswers.Essential]),
    __metadata("design:type", String)
], CreateQualifyDto.prototype, "answersVariant", void 0);
class CheckQualifyDto {
}
exports.CheckQualifyDto = CheckQualifyDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CheckQualifyDto.prototype, "type", void 0);
//# sourceMappingURL=regard.dto.js.map