import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EScreenshotType } from 'src/shared/enums/screenshot.enum';

export type ScreenshotDocument = Screenshot & Document;

@Schema()
export class Screenshot extends Document {
  @Prop({ type: Number, required: true })
  index: number;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, enum: EScreenshotType, default: EScreenshotType.Other })
  type: EScreenshotType;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({type: String, default: '' }) // for del files from cloudinary
  public_id: string;

  @Prop({ type: Boolean, default: false })
  essential: false;

  @Prop({ type: Object, default: {} })
  data: {[key: string]: any};

  @Prop({ type: String, required: true })
  created: Date;
}

export const ScreenshotSchema = SchemaFactory.createForClass(Screenshot);
