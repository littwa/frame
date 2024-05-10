import { Request } from 'express';

export interface IRequestExt extends Request {
    user: IUserExtendReq;
}

export interface IUserExtendReq {
    _id: string;
    email: string;
    role: string;
    sid: string;
}
