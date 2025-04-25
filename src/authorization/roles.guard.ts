import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'src/shared/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // console.log('requiredRoles: ', requiredRoles);

        if (!requiredRoles) return true;

        // const request = context.switchToHttp().getRequest();
        // console.log('userCrutch: ', request);

        const fn = ExtractJwt.fromAuthHeaderAsBearerToken();
        const userCrutch = this.jwtService.verify(fn(context.switchToHttp().getRequest()));

        // console.log('userCrutch: ', userCrutch);

        if (!requiredRoles.includes(userCrutch.role)) throw new ForbiddenException();

        return true;
        // return requiredRoles === request.user.role;
        // return true;
    }
}
