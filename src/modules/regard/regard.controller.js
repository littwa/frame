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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegardController = void 0;
const common_1 = require("@nestjs/common");
const regard_service_1 = require("./regard.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../authorization/roles.decorator");
const role_enum_1 = require("../../shared/enums/role.enum");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const regard_dto_1 = require("./dto/regard.dto");
const platform_express_1 = require("@nestjs/platform-express");
let RegardController = class RegardController {
    constructor(regardService) {
        this.regardService = regardService;
    }
    async addRegard(body, req) {
        return await this.regardService.addRegard(body, req);
    }
    async createTextAndAddToRegard(files, body, param, req) {
        return this.regardService.createTextAndAddToRegard(files[0], body, param.id, req);
    }
    async addTextToRegard(param) {
        return this.regardService.addTextToRegard(param.textId, param.regardId);
    }
    async delRegard(param) {
        return await this.regardService.delRegard(param.id);
    }
    async updateText(files, param, body) {
        return await this.regardService.updateText(files[0], body);
    }
    async delTextFromRegard(param) {
        return await this.regardService.delTextFromRegard(param.textId, param.regardId);
    }
    async getRegards(req) {
        return this.regardService.getRegards(req);
    }
    async getRegardAggregated(param) {
        return this.regardService.getRegardAggregated(param.id);
    }
    async createQualify(body, param, req) {
        return this.regardService.createQualify(body, param.id, req);
    }
    async checkQualify(body, param, req) {
        return this.regardService.checkQualifyExec(body, param, req);
    }
    async startNextLap(param) {
        return this.regardService.startNextLap(param.id);
    }
    async resetQualityTextLap(param) {
        return this.regardService.resetQualityTextLap(param);
    }
    async markAsFinishQualityTextLap(param) {
        return this.regardService.markAsFinishQualityTextLap(param);
    }
    async findTexts(req, param) {
        return this.regardService.findTexts(param.content);
    }
};
exports.RegardController = RegardController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Regard' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return added Regard.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not add Regard.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('add-regard'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.AddRegardDto, Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "addRegard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Text and add to Regard' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return created Text and add to Regard.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not create Text and add to Regard.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('create-add-text/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        regard_dto_1.TextDto,
        regard_dto_1.ParamIdDto, Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "createTextAndAddToRegard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Text to Regard' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return added Text to Regard.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not added Text to Regard.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('add-text/:textId/:regardId'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdTextRegardDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "addTextToRegard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Del Regard' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Return del Regard list.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not del Regard list.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('del-regard/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "delRegard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Text' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return update Text.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not update Text.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('update-text/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, regard_dto_1.ParamIdDto, Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "updateText", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Del Text from Regard' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return Regard.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not del Text from Regard.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('del-text/:textId/:regardId'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdTextRegardDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "delTextFromRegard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get regards lists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return regards lists.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not get regards lists.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-regards'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "getRegards", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user regard aggregated' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user regard aggregated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not get user regard aggregated.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-regard/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "getRegardAggregated", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return created Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not create Qualify.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('create-qualify/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.CreateQualifyDto, regard_dto_1.ParamIdDto, Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "createQualify", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return Checked Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Checked Qualify.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('check-qualify/:textId/:regardId/:qualifyId'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.CheckQualifyDto, regard_dto_1.ParamIdTextRegardQualifyDto, Object]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "checkQualify", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Start Next Lap Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return Updated Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Updated Qualify.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('lap-qualify/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "startNextLap", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reset Quality Text Lap' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return Updated Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Updated Qualify.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('reset-text-qualify/:textId/:regardId/:qualifyId'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdTextRegardQualifyDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "resetQualityTextLap", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark As Finish Quality Text Lap' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return Updated Qualify' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Updated Qualify.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('mark-text-qualify/:textId/:regardId/:qualifyId'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regard_dto_1.ParamIdTextRegardQualifyDto]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "markAsFinishQualityTextLap", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find texts by content lists.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return Found texts.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not find texts.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('find-texts/:content'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, regard_dto_1.TextDtoFind]),
    __metadata("design:returntype", Promise)
], RegardController.prototype, "findTexts", null);
exports.RegardController = RegardController = __decorate([
    (0, common_1.Controller)('regard'),
    __metadata("design:paramtypes", [regard_service_1.RegardService])
], RegardController);
//# sourceMappingURL=regard.controller.js.map