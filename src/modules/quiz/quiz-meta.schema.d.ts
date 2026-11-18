import mongoose, { Document, Types } from 'mongoose';
export type QuizMetaDocument = QuizMeta & Document;
export declare class QuizMeta extends Document {
    species: string;
    created: Date;
}
export declare const QuizMetaSchema: mongoose.Schema<QuizMeta, mongoose.Model<QuizMeta, any, any, any, mongoose.Document<unknown, any, QuizMeta> & QuizMeta & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, QuizMeta, mongoose.Document<unknown, {}, mongoose.FlatRecord<QuizMeta>> & mongoose.FlatRecord<QuizMeta> & {
    _id: Types.ObjectId;
}>;
