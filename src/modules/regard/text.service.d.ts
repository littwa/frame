import { Model } from 'mongoose';
import { Text, TextDocument } from './text.schema';
export declare class TextService {
    private textModel;
    constructor(textModel: Model<TextDocument>);
    find(body: any): Promise<import("mongoose").Document<unknown, {}, TextDocument> & Text & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
