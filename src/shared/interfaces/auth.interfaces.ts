import { Request } from 'express';
import { ETokenTypes } from 'src/shared/enums/common.enum';

export interface IRequestExt extends Request {
  user: IUserExtendReq;
}

export interface IUserExtendReq {
  uid: string;
  email: string;
  role: string;
  sid: string;
  token_type: ETokenTypes;
}
