import mongoose, { Document, Types } from 'mongoose';
import { UserDocument } from "../users/user.schema";
import { RegardDocument } from "./regard.schema";
import { EQualifyAnswers, EQualifyType } from "../../shared/enums/regard.enum";
export type QualifyDocument = Qualify & Document;
export declare class Qualify extends Document {
    type: EQualifyType;
    regard: RegardDocument;
    finished: boolean;
    finishedLap: boolean;
    repeat: number;
    progress: {
        [textId: string]: number;
    };
    stat: {
        textId: {
            type: mongoose.Schema.Types.ObjectId;
            ref: 'Text';
        };
        amount: number;
        checkedAmount: number;
        lapChecked: boolean;
        finishedInQualify: boolean;
        obj: {
            [key: string]: any;
        };
    }[];
    answersVariant: EQualifyAnswers;
    author: UserDocument;
    created: Date;
}
export declare const QualifySchema: mongoose.Schema<Qualify, mongoose.Model<Qualify, any, any, any, mongoose.Document<unknown, any, Qualify> & Qualify & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Qualify, mongoose.Document<unknown, {}, mongoose.FlatRecord<Qualify>> & mongoose.FlatRecord<Qualify> & {
    _id: Types.ObjectId;
}>;
