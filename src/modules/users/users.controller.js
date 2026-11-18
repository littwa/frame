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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const role_enum_1 = require("../../shared/enums/role.enum");
const roles_decorator_1 = require("../../authorization/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const common_dto_1 = require("../../shared/dto/common.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    postSignUpUser(body, files = []) {
        console.log(100001, body);
        switch (body.role) {
            case role_enum_1.ERole.Customer:
                return this.userService.createUserCustomer(body, files[0]);
            default:
                return new common_1.BadRequestException('unknown role');
        }
    }
    signOut(req) {
        return this.userService.signOutUser(req.user);
    }
    async updateUser(body, param, query, files = []) {
        return await this.userService.updateUser(param, body, files[0]);
    }
    async sendEmail(body) {
        return this.userService.sendEmail(body.email, body.text);
    }
    async changePassword(body) { }
    getCurrentUser(req) {
        return this.userService.getCurrentUser(req.user);
    }
    getUserById(req, param) {
        return this.userService.getUserById(param.userId);
    }
    getUserFollowersById(req, param) {
        return this.userService.getUserFollowersById(param.userId);
    }
    getUserFollowingById(req, param) {
        return this.userService.getUserFollowingById(param.userId);
    }
    getCurrentUserAggregate(req) {
        return this.userService.getCurrentUserAggregate(req.user);
    }
    async getUsers(param, query, req) {
        return await this.userService.getUsers(param, query, req);
    }
    async getUsersExtends(query, req) {
        return await this.userService.getUsersExtends(query);
    }
    signInCustomer(body) {
        return this.userService.signIn(body);
    }
    follow(req, body) {
        return this.userService.follow(req, body);
    }
    unfollow(req, body) {
        return this.userService.unfollow(req, body);
    }
    addFavoriteProduct(req, param) {
        return this.userService.addFavoriteProduct(param.productId, req);
    }
    delFavoriteProduct(req, param) {
        return this.userService.delFavoriteProduct(param.productId, req);
    }
    addCartProduct(req, param) {
        return this.userService.addCartProduct(param, req);
    }
    delCartProduct(req, param) {
        return this.userService.delCartProduct(param, req);
    }
    getCustomer(req) {
        return this.userService.getInfoUserCustomer(req.user);
    }
    getRefreshToken(req) {
        return this.userService.getRefreshToken(req);
    }
    getCurrentUserTest(headers, request, req, param, body) {
        console.log(400001, req, param, body);
        console.log('this.userService.configFactory.v = ', this.userService.configFactory.v);
        console.log('this.userService.useClassTest.v = ', this.userService.useClassTest.v);
        return { res: 'res' };
    }
    async getTest(body, param, query, files) {
        const service = this.userService.decodeAnyToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI2NTM1MTkwZjgwNDFmYjk5MWJhNmE0YWUiLCJ1aWQiOiI2MmRlYzg4NWNjMWE1YTgwMjc4MzYzMzAiLCJzZWNyZXQiOiJzd29yZGZpc2giLCJlbWFpbCI6ImRldmFjY0BtZXRhLnVhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk3OTc4NjM5LCJleHAiOjE2OTc5ODIyMzl9.ujVhZbemDNOLE3h9PF8RwUjYZHMCttNU6Vn_lMcgidA');
        return {
            service,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return ...' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not ...' }),
    (0, common_1.Post)('sign-up'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCustomerCreateDto, Array]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "postSignUpUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sign out' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sign out success.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sign out error.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('sign-out'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return updated user.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not update user.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('up-date/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserUpdateDto,
        common_dto_1.ParamIdDto, Object, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'send email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return sent.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not send.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('send-email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update pass' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not update.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('up-date-pass'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('get'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('get/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('get-followers/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserFollowersById", null);
__decorate([
    (0, common_1.Get)('get-following/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserFollowingById", null);
__decorate([
    (0, common_1.Get)('get-aggregate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUserAggregate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return users.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not users.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-users{/:someName}'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UsersFindDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users extends' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return users extends.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Can not users extends.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('get-users-ext'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UsersFindDtoExtends, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersExtends", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signInCustomer", null);
__decorate([
    (0, common_1.Post)('follow'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserFollowBodyDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "follow", null);
__decorate([
    (0, common_1.Post)('unfollow'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)([role_enum_1.ERole.Admin, role_enum_1.ERole.Customer]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserFollowBodyDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unfollow", null);
__decorate([
    (0, common_1.Patch)('add-favorite-product/:productId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addFavoriteProduct", null);
__decorate([
    (0, common_1.Patch)('del-favorite-product/:productId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delFavoriteProduct", null);
__decorate([
    (0, common_1.Patch)('add-cart-product/:productId/:amount'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CartProductUserParamDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addCartProduct", null);
__decorate([
    (0, common_1.Patch)('del-cart-product/:productId/:amount'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CartProductUserParamDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delCartProduct", null);
__decorate([
    (0, common_1.Get)('get/user-customer-info'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getRefreshToken", null);
__decorate([
    (0, common_1.Get)('test-jwt'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Param)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUserTest", null);
__decorate([
    (0, common_1.Post)('post-test'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserUpdateDto, Object, Object, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTest", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map