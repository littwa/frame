import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { EQuizType } from 'src/shared/enums/quiz.enum';
import { UserDocument } from '../users/user.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz extends Document {
  @Prop({type: String, required: true, enum: EQuizType })
  type: EQuizType;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;

  @Prop({ type: String, required: true })
  created: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
