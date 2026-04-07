import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  async tst() {
    return 'quiz tst';
  }
}
