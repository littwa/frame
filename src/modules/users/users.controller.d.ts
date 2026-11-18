import { BadRequestException } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CartProductUserParamDto, UserCustomerCreateDto, UserFollowBodyDto, UsersFindDto, UsersFindDtoExtends, UserUpdateDto } from './dto/user.dto';
import { ParamIdDto } from "../../shared/dto/common.dto";
import { IRequestExt } from '../../shared/interfaces/auth.interfaces';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    postSignUpUser(body: UserCustomerCreateDto, files?: Array<Express.Multer.File>): Promise<object> | BadRequestException;
    signOut(req: any): Promise<{
        req: string;
    }>;
    updateUser(body: UserUpdateDto, param: ParamIdDto, query: any, files?: Array<Express.Multer.File>): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    sendEmail(body: {
        email: string;
        text: string;
    }): Promise<{
        email: string;
        tst: string;
    }>;
    changePassword(body: any): Promise<void>;
    getCurrentUser(req: any): Promise<{
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
        followers: import("./user.schema").UserDocument[];
        following: import("./user.schema").UserDocument[];
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
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
    }>;
    getUserById(req: any, param: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserFollowersById(req: any, param: any): Promise<import("./user.schema").UserDocument[]>;
    getUserFollowingById(req: any, param: any): Promise<import("./user.schema").UserDocument[]>;
    getCurrentUserAggregate(req: any): Promise<any[]>;
    getUsers(param: any, query: UsersFindDto, req: any): Promise<{
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
    getUsersExtends(query: UsersFindDtoExtends, req: any): Promise<{
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
    signInCustomer(body: any): Promise<{
        _id: any;
        username: string;
        email: string;
        status: string;
        role: string;
        accessToken: string;
        refreshToken: string;
    }>;
    follow(req: any, body: UserFollowBodyDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    unfollow(req: IRequestExt, body: UserFollowBodyDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addFavoriteProduct(req: any, param: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delFavoriteProduct(req: any, param: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addCartProduct(req: any, param: CartProductUserParamDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delCartProduct(req: any, param: CartProductUserParamDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCustomer(req: any): Promise<{
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
        followers: import("./user.schema").UserDocument[];
        following: import("./user.schema").UserDocument[];
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
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
    }>;
    getRefreshToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getCurrentUserTest(headers: any, request: any, req: any, param: any, body: any): {
        res: string;
    };
    getTest(body: UserUpdateDto, param: any, query: any, files: Array<Express.Multer.File>): Promise<{
        service: any;
    }>;
}
