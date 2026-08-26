import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { EQuizSpecies, EQuizType } from 'src/shared/enums/quiz.enum';
import { UserDocument } from 'src/modules/users/user.schema';
import { IQuizTask } from 'src/shared/interfaces/quiz.interfaces';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz extends Document {
  @Prop({ type: String, required: true, enum: EQuizType })
  type: EQuizType;

  @Prop({ type: String, required: true, enum: EQuizSpecies })
  species: EQuizSpecies;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;

  @Prop({ type: Array<IQuizTask>, default: []})
  tasks: IQuizTask[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: UserDocument;

  @Prop({ type: String, required: true })
  created: Date;

  @Prop({ type: Object, default: {}})
  data: { [key: string]: any };
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
