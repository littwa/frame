import { Injectable } from '@nestjs/common';
import { IQuizMathGenerateParams } from 'src/shared/interfaces/quiz.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from 'src/modules/quiz/quiz.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async tst() {
    return 'quiz tst';
  }

  async autoGenerateMathQuiz(params: IQuizMathGenerateParams) {
    console.log(params);

    // const quiz = this.quizModel.create({})

    let a = 1;
    let b = 3;
    [a, b] = [b, a];
    console.log(a,b) // 3,1

    const arr = [3, 1, 9, 5, 6, 4, 7, 4, 9, 2, 0];
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr.length - i; j += 1) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    console.log('arr: ', arr);

    return arr;
  }

  taskGenerator(params: IQuizMathGenerateParams) {}
}
