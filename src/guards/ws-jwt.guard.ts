import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
/*
    Custom imports for AuthService, jwt secret, etc...
*/
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService,) {}

    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();

        console.log(4123, client.handshake)
        console.log(666, client.handshake.headers.authorization)
        // console.log(555, client.handshake.auth.token)

        const token = client.handshake.headers.authorization;

        console.log(7717, token)

        let parsedToken;

        try {
            parsedToken = await this.jwtService.verify(token.slice(7), {
                secret: process.env.TOKEN_SECRET,
            });
        }
        catch (err){
            // throw err
            console.error(11, err);
            return false;
        }

        // const parsedToken = this.jwtService.decode(token);

        console.log(134, parsedToken);

        // const token = req.get('Authorization' || '').slice(7);
        // const parsedToken = await this.jwtService.verify(token, {
        //     secret: process.env.TOKEN_SECRET,
        // });
        // if (!parsedToken) throw new UnauthorizedException('Not authorized');
        // const session = await this.sessionModel.findById(parsedToken.sid);
        // const user = await this.userModel.findById(parsedToken.uid);

        // const cookies: string[] = client.handshake.headers.cookie.split('; ');
        // const authToken = cookies.find(cookie => cookie.startsWith('jwt')).split('=')[1];
        // const jwtPayload: JwtPayload = <JwtPayload> jwt.verify(authToken, yourSecret);
        // const user: User = await this.authService.validateUser(jwtPayload);
        // Bonus if you need to access your user after the guard
        // context.switchToWs().getData().user = user;
        // return Boolean(user);
        return true;
    }
}
