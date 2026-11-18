import mongoose, { Document, Types } from 'mongoose';
import { UserDocument } from '../users/user.schema';
import { TextDocument } from './text.schema';
import { QualifyDocument } from './qualify.schema';
export type RegardDocument = Regard & Document;
export declare class Regard extends Document {
    name: string;
    list: TextDocument[];
    qualifies: QualifyDocument[];
    qualifyAmount: number;
    qualifyInProgress: boolean;
    author: UserDocument;
    created: Date;
}
export declare const RegardSchema: mongoose.Schema<Regard, mongoose.Model<Regard, any, any, any, mongoose.Document<unknown, any, Regard> & Regard & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Regard, mongoose.Document<unknown, {}, mongoose.FlatRecord<Regard>> & mongoose.FlatRecord<Regard> & {
    _id: Types.ObjectId;
}>;
