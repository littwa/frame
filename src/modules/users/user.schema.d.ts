import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;
export declare class User extends Document {
    email: string;
    dateCreated: number;
    password: string;
    username: string;
    role: string;
    status: string;
    dayOfBirth: Date;
    verificationCode: string;
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
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
