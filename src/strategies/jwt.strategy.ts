import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ConfigJwtOptions } from 'src/app/shared/interfaces/config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET,
            ignoreExpiration: false,
            passReqToCallback: true, //  validate(request, jwt_payload, done_callback)
        });
    }

    validate(request, jwt_payload, done_callback) {
        // console.log('request', request.rawHeaders);
        // console.log('jwt_payload: ', jwt_payload);
        // console.log('done_callback', done_callback);
        const { uid: _id, email, role, sid } = jwt_payload;

        // done_callback(null, { _id, email, role }); // analog return
        // return { _id, email, role };
        // return {};
        return { _id, email, role, sid };
    }
}
