import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { UserDocument } from 'src/modules/users/user.schema';
import { RegardDocument } from 'src/modules/regard/regard.schema';
import { EQualifyAnswers, EQualifyType } from 'src/shared/enums/regard.enum';

export type QualifyDocument = Qualify & Document;

@Schema()
export class Qualify extends Document {
  @Prop({ type: String, required: true, enum: EQualifyType })
  type: EQualifyType;

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Regard' })
  regard: RegardDocument;

  @Prop({ type: Boolean, default: false })
  finished: boolean;

  @Prop({ type: Boolean, default: false })
  finishedLap: boolean;

  @Prop({ type: Number, default: 8 })
  repeat: number;

  @Prop({ type: Object, required: true })
  progress: { [textId: string]: number };

  @Prop({ type: Array, default: [] })
  stat: {
    textId: { type: mongoose.Schema.Types.ObjectId; ref: 'Text' };
    amount: number;
    checkedAmount: number;
    lapChecked: boolean;
    finishedInQualify: boolean;
    obj: { [key: string]: any }
  }[];

  @Prop({
    type: String,
    default: EQualifyAnswers.Global,
    enum: EQualifyAnswers,
  })
  answersVariant: EQualifyAnswers;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;

  @Prop({ type: String, required: true })
  created: Date;
}

export const QualifySchema = SchemaFactory.createForClass(Qualify);
