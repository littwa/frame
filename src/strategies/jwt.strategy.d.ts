import { ConfigService } from '@nestjs/config';
import { IUserExtendReq } from '../shared/interfaces/auth.interfaces';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(request: any, jwt_payload: any, done_callback: any): IUserExtendReq;
}
export {};
