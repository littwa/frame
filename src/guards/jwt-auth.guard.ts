import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ETokenTypes } from 'src/shared/enums/common.enum';
import { USERS_REFRESH_URL } from 'src/shared/constants/url.constants';
import { IUserExtendReq } from 'src/shared/interfaces/auth.interfaces';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // console.log('handleRequest=context', context);
    // console.log('handleRequest=err', err);
    // console.log('handleRequest=user', user);
    // console.log('handleRequest=info', info);

    if (!user) {
      throw new UnauthorizedException('Unauthorized Exception JwtAuth');
    }

    const { url } = context.getArgByIndex(0);
    const { token_type }: IUserExtendReq = user;

    if (url !== USERS_REFRESH_URL && token_type === ETokenTypes.Refresh) {
      throw new UnauthorizedException('Bad Access Token');
    }

    if (url === USERS_REFRESH_URL && token_type === ETokenTypes.Access) {
      throw new UnauthorizedException('Bad Refresh Token');
    }

    return user;
  }
}
