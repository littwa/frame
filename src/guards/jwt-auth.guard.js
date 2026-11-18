"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const common_enum_1 = require("../shared/enums/common.enum");
const url_constants_1 = require("../shared/constants/url.constants");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user, info, context) {
        if (!user) {
            throw new common_1.UnauthorizedException('Unauthorized Exception JwtAuth');
        }
        const { url } = context.getArgByIndex(0);
        const { token_type } = user;
        if (url !== url_constants_1.USERS_REFRESH_URL && token_type === common_enum_1.ETokenTypes.Refresh) {
            throw new common_1.UnauthorizedException('Bad Access Token');
        }
        if (url === url_constants_1.USERS_REFRESH_URL && token_type === common_enum_1.ETokenTypes.Access) {
            throw new common_1.UnauthorizedException('Bad Refresh Token');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map