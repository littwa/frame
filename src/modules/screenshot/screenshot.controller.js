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
exports.ScreenshotController = void 0;
const common_1 = require("@nestjs/common");
const screenshot_service_1 = require("./screenshot.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../authorization/roles.decorator");
const role_enum_1 = require("../../shared/enums/role.enum");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const screenshot_dto_1 = require("./dto/screenshot.dto");
const platform_express_1 = require("@nestjs/platform-express");
let ScreenshotController = class ScreenshotController {
    constructor(screenshotService) {
        this.screenshotService = screenshotService;
    }
    async addScreenshotsList(body, req) {
        return await this.screenshotService.addScreenshotsList(body, req);
    }
    async createScreenshotsAndAddToList(files, body, param) {
        return this.screenshotService.createScreenshotsAndAddToList(files, body, param.id);
    }
    async delListAndScreenshots(param) {
        return await this.screenshotService.delListAndScreenshots(param.id);
    }
    async getScreenshotsLists(req) {
        return this.screenshotService.getScreenshotsLists(req);
    }
    async getScreenshotsListAggregate(param) {
        return this.screenshotService.getScreenshotsListAggregate(param.id);
    }
};
exports.ScreenshotController = ScreenshotController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create screenshots list' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return created screenshot list.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not create screenshot list.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('add-list'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screenshot_dto_1.CreateScreenshotListDto, Object]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "addScreenshotsList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create screenshots and add to list' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return created screenshots and add to list.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not create screenshots and add to list.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('add/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        screenshot_dto_1.CreateScreenshotDto,
        screenshot_dto_1.ParamIdScreenshotDto]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "createScreenshotsAndAddToList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Del screenshots list' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Return del screenshots list.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not del screenshots list.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('del-list/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screenshot_dto_1.ParamIdScreenshotDto]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "delListAndScreenshots", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get screenshots lists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return screenshots lists.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not screenshots lists.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-lists'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "getScreenshotsLists", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user screenshots list aggregate' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user list aggregate.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not user list aggregate.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-list/:id'),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screenshot_dto_1.ParamIdScreenshotDto]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "getScreenshotsListAggregate", null);
exports.ScreenshotController = ScreenshotController = __decorate([
    (0, common_1.Controller)('screenshot'),
    __metadata("design:paramtypes", [screenshot_service_1.ScreenshotService])
], ScreenshotController);
//# sourceMappingURL=screenshot.controller.js.map