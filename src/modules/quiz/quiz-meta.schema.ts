import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { EQuizType } from 'src/shared/enums/quiz.enum';
import { UserDocument } from '../users/user.schema';

export type QuizMetaDocument = QuizMeta & Document;

@Schema()
export class QuizMeta extends Document {
  @Prop({ type: Array, default: [] })
  species: string;

  @Prop({ type: String, required: true })
  created: Date;
}

export const QuizMetaSchema = SchemaFactory.createForClass(QuizMeta);
