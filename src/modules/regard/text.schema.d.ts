import mongoose, { Document, Types } from 'mongoose';
import { ETextType } from '../../shared/enums/regard.enum';
import { RegardDocument } from './regard.schema';
import { UserDocument } from '../users/user.schema';
import { QualifyDocument } from './qualify.schema';
export type TextDocument = Text & Document;
export declare class Text extends Document {
    content: string;
    synonyms: string[];
    translation: string[];
    pronunciation: string;
    type: ETextType;
    statistics: string[];
    img: string;
    public_id: string;
    essential: boolean;
    created: Date;
    regards: RegardDocument[];
    qualifies: QualifyDocument[];
    author: UserDocument;
}
export declare const TextSchema: mongoose.Schema<Text, mongoose.Model<Text, any, any, any, mongoose.Document<unknown, any, Text> & Text & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Text, mongoose.Document<unknown, {}, mongoose.FlatRecord<Text>> & mongoose.FlatRecord<Text> & {
    _id: Types.ObjectId;
}>;
