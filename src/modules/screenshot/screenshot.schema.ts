import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ScreenshotDocument = Screenshot & Document;

@Schema()
export class Screenshot extends Document {
  @Prop({ type: String, required: true })
  name: string;
}

export const ScreenshotSchema = SchemaFactory.createForClass(Screenshot);
