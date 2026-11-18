import mongoose, { Document, Types } from 'mongoose';
import { EQuizSpecies, EQuizType } from "../../shared/enums/quiz.enum";
import { UserDocument } from "../users/user.schema";
import { IQuizTask } from "../../shared/interfaces/quiz.interfaces";
export type QuizDocument = Quiz & Document;
export declare class Quiz extends Document {
    type: EQuizType;
    species: EQuizSpecies;
    name: string;
    isCompleted: boolean;
    tasks: IQuizTask[];
    author: UserDocument;
    owner: UserDocument;
    created: Date;
    data: {
        [key: string]: any;
    };
}
export declare const QuizSchema: mongoose.Schema<Quiz, mongoose.Model<Quiz, any, any, any, mongoose.Document<unknown, any, Quiz> & Quiz & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Quiz, mongoose.Document<unknown, {}, mongoose.FlatRecord<Quiz>> & mongoose.FlatRecord<Quiz> & {
    _id: Types.ObjectId;
}>;
