import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    uid: string;

    @Prop({ type: Number, required: true })
    expRefreshToken: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
