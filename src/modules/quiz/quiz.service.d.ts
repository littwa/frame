import { IQuizMathGenerateParams } from "../../shared/interfaces/quiz.interfaces";
import { QuizDocument } from "./quiz.schema";
import { Model } from 'mongoose';
export declare class QuizService {
    private quizModel;
    constructor(quizModel: Model<QuizDocument>);
    tst(): Promise<string>;
    autoGenerateMathQuiz(params: IQuizMathGenerateParams): Promise<number[]>;
    taskGenerator(params: IQuizMathGenerateParams): void;
}
