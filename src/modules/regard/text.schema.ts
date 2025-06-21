import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { ETextType } from '../../shared/enums/regard.enum';
import { RegardDocument } from './regard.schema';
import { UserDocument } from '../users/user.schema';
import { QualifyDocument } from './qualify.schema';
// import * as mongoose from 'mongoose';
// import { IDate } from 'src/shared/interfaces/prop.interfaces';
// import { EPhraseDifficult, EPhraseResults, EPhraseType } from '../../shared/enums/wit.enum';

export type TextDocument = Text & Document;

@Schema()
export class Text extends Document {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Array<string>, default: [] })
  synonyms: string[];

  @Prop({ type: Array<string>, required: true })
  translation: string[];

  @Prop({ type: String, default: '' })
  pronunciation : string; // url form api

  @Prop({ type: String, default: ETextType.Word, enum: ETextType })
  type: ETextType;

  @Prop({ type: Array<string>, default: [] })
  statistics: string[];

  @Prop({ type: String, default: '' })
  img: string;

  @Prop({type: String, default: '' }) // for del files from cloudinary
  public_id: string;

  @Prop({ type: Boolean, default: false })
  essential: boolean;

  @Prop({ type: String, required: true })
  created: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Regard' }] })
  regards: RegardDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualify' }] })
  qualifies: QualifyDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: UserDocument;
}

export const TextSchema = SchemaFactory.createForClass(Text);
