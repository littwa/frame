import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { ETesterNum } from "../../shared/enums/tester.enum";
export type TesterDocument = Tester & Document;
export declare class Tester extends Document {
    name: string;
    description: string;
    status: string;
    distinct: string;
    num: ETesterNum;
    size: ETesterNum;
    dateCreated: Date;
}
export declare const TesterSchema: mongoose.Schema<Tester, mongoose.Model<Tester, any, any, any, Document<unknown, any, Tester> & Tester & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Tester, Document<unknown, {}, mongoose.FlatRecord<Tester>> & mongoose.FlatRecord<Tester> & {
    _id: Types.ObjectId;
}>;
