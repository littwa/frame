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
exports.TesterController = void 0;
const common_1 = require("@nestjs/common");
const tester_service_1 = require("./tester.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../authorization/roles.decorator");
const role_enum_1 = require("../../shared/enums/role.enum");
const testers_dto_1 = require("./dto/testers.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const common_service_1 = require("../../shared/services/common.service");
let TesterController = class TesterController {
    constructor(testerService, commonService) {
        this.testerService = testerService;
        this.commonService = commonService;
    }
    getProducts() {
        return this.testerService.getTester();
    }
    createTester(body, param, query, req) {
        console.log('query=', query);
        console.log('param=', param);
        console.log('body=', body);
        console.log('req=', req.user);
        return this.testerService.createTester(param, query, body, req);
    }
    executeTester(body, param, query, req) {
        console.log('query==', query);
        console.log('param= ', param);
        console.log('body=', body);
        console.log('req.user=', req.user);
        return { query, param, body };
    }
    simpleTest(files = []) {
        console.log(files[0]);
        return 'ok';
    }
    baseTest() {
        return 'Success* GET tester/base';
    }
};
exports.TesterController = TesterController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Testers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return Testers' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Testers' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TesterController.prototype, "getProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return ...' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not ...' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [testers_dto_1.TesterDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TesterController.prototype, "createTester", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Execute tester' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return tester.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not Execute.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('execute/:testerId{/:qwe}'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [testers_dto_1.ExecuteTesterBodyDto,
        testers_dto_1.ExecuteTesterParamDto,
        testers_dto_1.ExecuteTesterQueryDto, Object]),
    __metadata("design:returntype", void 0)
], TesterController.prototype, "executeTester", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Simple test endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error' }),
    (0, common_1.Post)('simple-test'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TesterController.prototype, "simpleTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Base test endpoint get.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error' }),
    (0, common_1.Get)('base'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TesterController.prototype, "baseTest", null);
exports.TesterController = TesterController = __decorate([
    (0, swagger_1.ApiTags)('tester'),
    (0, common_1.Controller)('tester'),
    __metadata("design:paramtypes", [tester_service_1.TesterService,
        common_service_1.CommonService])
], TesterController);
//# sourceMappingURL=tester.controller.js.map