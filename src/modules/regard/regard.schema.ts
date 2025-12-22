import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '../users/user.schema';
import { TextDocument } from './text.schema';
import { QualifyDocument } from './qualify.schema';

export type RegardDocument = Regard & Document;

@Schema()
export class Regard extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }] })
  list: TextDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualify' }] })
  qualifies: QualifyDocument[];

  @Prop({ type: Number, default: 0 })
  qualifyAmount: number;

  @Prop({ type: Boolean, default: false })
  qualifyInProgress: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;

  @Prop({ type: String, required: true })
  created: Date;
}

export const RegardSchema = SchemaFactory.createForClass(Regard);
