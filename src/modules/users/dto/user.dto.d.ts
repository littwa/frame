import { ERole } from "../../../shared/enums/role.enum";
export declare class UserUpdateDto {
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly dayOfBirth: string;
    readonly country: string;
    readonly hobby: string;
    readonly occupation: string;
    readonly city: string;
}
export declare class UserCreateDto extends UserUpdateDto {
    readonly username: string;
    readonly role: ERole;
    readonly email: string;
    readonly password: string;
    readonly verificationCode: string;
    readonly avatarURL: string;
    readonly status: string;
}
export declare class UserCustomerCreateDto extends UserCreateDto {
    readonly role: ERole;
    readonly password: string;
}
export declare class CartProductUserParamDto {
    readonly productId: string;
    readonly amount: string;
}
export declare class UserIdParamDto {
    readonly id: string;
}
export declare class UsersFindDto {
    readonly someName: string;
    readonly size: string;
    readonly sort: string;
}
export declare class UserFollowBodyDto {
    readonly followId: string;
}
export declare class UsersFindDtoExtends {
    readonly size: string;
    readonly sort: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly dayOfBirth: string;
    readonly country: string;
    readonly hobby: string;
    readonly occupation: string;
    readonly city: string;
}
