import { Document, Types } from 'mongoose';
import { EScreenshotType } from "../../shared/enums/screenshot.enum";
export type ScreenshotDocument = Screenshot & Document;
export declare class Screenshot extends Document {
    index: number;
    description: string;
    type: EScreenshotType;
    url: string;
    public_id: string;
    essential: false;
    data: {
        [key: string]: any;
    };
    created: Date;
}
export declare const ScreenshotSchema: import("mongoose").Schema<Screenshot, import("mongoose").Model<Screenshot, any, any, any, Document<unknown, any, Screenshot> & Screenshot & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Screenshot, Document<unknown, {}, import("mongoose").FlatRecord<Screenshot>> & import("mongoose").FlatRecord<Screenshot> & {
    _id: Types.ObjectId;
}>;
