import {ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        // console.log('handleRequest===context', context);
        // console.log('handleRequest===status', status);
        // console.log('handleRequest===err', err);
        // console.log('handleRequest===user', user);
        // console.log('handleRequest===info', info);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
