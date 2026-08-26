import { EQuizMathOperation } from '../enums/quiz.enum';

export type QuizOperations =
  | EQuizMathOperation.Addition
  | EQuizMathOperation.Subtraction
  | EQuizMathOperation.Multiplication
  | EQuizMathOperation.Division;
