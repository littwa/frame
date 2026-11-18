import mongoose, { Document, Types } from 'mongoose';
import { ScreenshotDocument } from './screenshot.schema';
export type ScreenshotListDocument = ScreenshotList & Document;
export declare class ScreenshotList extends Document {
    name: string;
    public_id_screenshots: string[];
    screenshots: ScreenshotDocument[];
    author: ScreenshotDocument;
    created: Date;
}
export declare const ScreenshotListSchema: mongoose.Schema<ScreenshotList, mongoose.Model<ScreenshotList, any, any, any, mongoose.Document<unknown, any, ScreenshotList> & ScreenshotList & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ScreenshotList, mongoose.Document<unknown, {}, mongoose.FlatRecord<ScreenshotList>> & mongoose.FlatRecord<ScreenshotList> & {
    _id: Types.ObjectId;
}>;
