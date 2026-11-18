import { QuizOperations } from "../types/quiz.type";
export interface IQuiz {
}
export interface IQuizTask {
    question: string;
    answer: string;
    result: boolean;
    time: number;
}
export interface IQuizMathGenerateParams {
    quantity: number;
    ceiling: number;
    operations: QuizOperations[];
}
