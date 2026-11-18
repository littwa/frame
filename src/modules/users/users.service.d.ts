import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from "./user.schema";
import { JwtService } from '@nestjs/jwt';
import { CartProductUserParamDto, UserCustomerCreateDto } from "./dto/user.dto";
import { Session, SessionDocument } from "./session.schema";
import { ConfigService } from '@nestjs/config';
import { CommonService } from "../../shared/services/common.service";
import { IRequestExt, IUserExtendReq } from "../../shared/interfaces/auth.interfaces";
import { MailService } from "../../mail/mail.service";
export declare class UsersService {
    sessionModel: Model<SessionDocument>;
    userModel: Model<UserDocument>;
    private jwtService;
    configService: ConfigService;
    configFactory: any;
    useClassTest: any;
    private commonService;
    private mailService;
    refreshTokenPath: string;
    accessTokenPath: string;
    constructor(sessionModel: Model<SessionDocument>, userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService, configFactory: any, useClassTest: any, commonService: CommonService, mailService: MailService);
    createUserCustomer(createUserCustomerDto: UserCustomerCreateDto, file: Express.Multer.File): Promise<object>;
    sendEmail(email: string, text?: string): Promise<{
        email: string;
        tst: string;
    }>;
    changePassword(email: string): Promise<void>;
    updateUser(param: any, body: any, file: Express.Multer.File): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    signOutUser(parsedToken: any): Promise<{
        req: string;
    }>;
    getInfoUserCustomer({ uid: _id }: IUserExtendReq): Promise<{
        email: string;
        dateCreated: number;
        username: string;
        role: string;
        status: string;
        dayOfBirth: Date;
        avatarURL: string;
        public_id: string;
        socialAuth: string;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        occupation: string;
        hobby: string;
        followers: UserDocument[];
        following: UserDocument[];
        data: {
            [k: string]: any;
        };
        quiz: {
            [k: string]: any;
        };
        _id: any;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: mongoose.Schema;
    }>;
    getUserById(id: any): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    getUserFollowersById(id: any): Promise<UserDocument[]>;
    getUserFollowingById(id: any): Promise<UserDocument[]>;
    getCurrentUser({ uid: _id }: IUserExtendReq): Promise<{
        email: string;
        dateCreated: number;
        username: string;
        role: string;
        status: string;
        dayOfBirth: Date;
        avatarURL: string;
        public_id: string;
        socialAuth: string;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        occupation: string;
        hobby: string;
        followers: UserDocument[];
        following: UserDocument[];
        data: {
            [k: string]: any;
        };
        quiz: {
            [k: string]: any;
        };
        _id: any;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: mongoose.Schema;
    }>;
    getUsers(param: any, query: any, req: any): Promise<{
        body: any[];
        pagination: {
            page: any;
            size: any;
            sort: any;
            totalElements: number;
            totalPages: any;
            lastPage: boolean;
        };
    }>;
    getUsersExtends(query: any): Promise<{
        body: any[];
        pagination: {
            page: any;
            size: any;
            sort: any;
            totalElements: number;
            totalPages: any;
            lastPage: boolean;
        };
    }>;
    getCurrentUserAggregate({ uid: _id }: IUserExtendReq): Promise<any[]>;
    addFavoriteProduct(productId: string, req: any): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    delFavoriteProduct(productId: string, req: any): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    addCartProduct(param: CartProductUserParamDto, req: any): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    delCartProduct(param: CartProductUserParamDto, req: any): Promise<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    follow(req: any, body: any): Promise<Omit<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    unfollow(req: IRequestExt, body: any): Promise<Omit<mongoose.Document<unknown, {}, UserDocument> & User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    signIn(signInDto: any): Promise<{
        _id: any;
        username: string;
        email: string;
        status: string;
        role: string;
        accessToken: string;
        refreshToken: string;
    }>;
    getRefreshToken(req: IRequestExt): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getPairTokensUtility: (session: any, user: any) => {
        accessToken: string;
        refreshToken: string;
    };
    createSessionUtility(uid: any): Promise<mongoose.Document<unknown, {}, SessionDocument> & Session & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    decodeAnyToken(authorization: string): any;
    test(body: any, param: any, query: any, file: any): Promise<any>;
}
