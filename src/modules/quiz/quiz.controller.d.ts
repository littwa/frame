import { QuizService } from "./quiz.service";
import { IQuizMathGenerateParamsDto } from "./dto/quiz.dto";
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizService);
    autoGenerateMathQuiz(body: IQuizMathGenerateParamsDto): Promise<number[]>;
    quiz(): Promise<string>;
    quizTest(): Promise<{
        q: number;
        p: number[];
    }>;
}
