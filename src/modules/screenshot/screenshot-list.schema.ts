import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ScreenshotDocument } from './screenshot.schema';

export type ScreenshotListDocument = ScreenshotList & Document;

@Schema()
export class ScreenshotList extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screenshot' }] })
  list: ScreenshotDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: ScreenshotDocument;

  @Prop({ type: String, required: true })
  created: Date;
}

export const ScreenshotListSchema = SchemaFactory.createForClass(ScreenshotList);
