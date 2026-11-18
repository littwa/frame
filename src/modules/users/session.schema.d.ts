import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type SessionDocument = Session & Document;
export declare class Session extends Document {
    uid: string;
    expRefreshToken: number;
}
export declare const SessionSchema: mongoose.Schema<Session, mongoose.Model<Session, any, any, any, Document<unknown, any, Session> & Session & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Session, Document<unknown, {}, mongoose.FlatRecord<Session>> & mongoose.FlatRecord<Session> & {
    _id: mongoose.Types.ObjectId;
}>;
