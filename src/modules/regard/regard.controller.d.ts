import { RegardService } from "./regard.service";
import { IRequestExt } from "../../shared/interfaces/auth.interfaces";
import { AddRegardDto, TextDto, ParamIdDto, ParamIdTextRegardDto, CreateQualifyDto, ParamIdTextRegardQualifyDto, CheckQualifyDto, TextDtoFind } from "./dto/regard.dto";
export declare class RegardController {
    private regardService;
    constructor(regardService: RegardService);
    addRegard(body: AddRegardDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTextAndAddToRegard(files: Array<Express.Multer.File>, body: TextDto, param: ParamIdDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addTextToRegard(param: ParamIdTextRegardDto): Promise<import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delRegard(param: ParamIdDto): Promise<import("mongoose").UpdateWriteOpResult>;
    updateText(files: Array<Express.Multer.File>, param: ParamIdDto, body: any): Promise<import("mongoose").Document<unknown, {}, import("./text.schema").TextDocument> & import("./text.schema").Text & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delTextFromRegard(param: ParamIdTextRegardDto): Promise<import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getRegards(req: IRequestExt): Promise<(import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getRegardAggregated(param: ParamIdDto): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("./regard.schema").RegardDocument> & import("./regard.schema").Regard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    createQualify(body: CreateQualifyDto, param: ParamIdDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./qualify.schema").QualifyDocument> & import("./qualify.schema").Qualify & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    checkQualify(body: CheckQualifyDto, param: ParamIdTextRegardQualifyDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./qualify.schema").QualifyDocument> & import("./qualify.schema").Qualify & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    startNextLap(param: ParamIdDto): Promise<import("mongoose").Document<unknown, {}, import("./qualify.schema").QualifyDocument> & import("./qualify.schema").Qualify & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resetQualityTextLap(param: ParamIdTextRegardQualifyDto): Promise<import("mongoose").Document<unknown, {}, import("./qualify.schema").QualifyDocument> & import("./qualify.schema").Qualify & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    markAsFinishQualityTextLap(param: ParamIdTextRegardQualifyDto): Promise<import("mongoose").Document<unknown, {}, import("./qualify.schema").QualifyDocument> & import("./qualify.schema").Qualify & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findTexts(req: IRequestExt, param: TextDtoFind): Promise<(import("mongoose").Document<unknown, {}, import("./text.schema").TextDocument> & import("./text.schema").Text & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
