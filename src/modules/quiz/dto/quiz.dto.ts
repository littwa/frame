import { QuizOperations } from 'src/shared/types/quiz.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class IQuizMathGenerateParamsDto {
  @ApiProperty()
  @IsNumber()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  readonly ceiling: number;

  @ApiProperty()
  @IsArray()
  readonly operations: QuizOperations[];
}