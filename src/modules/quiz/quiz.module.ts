import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from 'src/modules/quiz/quiz.controller';
import { QuizService } from 'src/modules/quiz/quiz.service';
import { Quiz, QuizSchema } from 'src/modules/quiz/quiz.schema';
import { QuizMeta, QuizMetaSchema } from 'src/modules/quiz/quiz-meta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizMeta.name, schema: QuizMetaSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
