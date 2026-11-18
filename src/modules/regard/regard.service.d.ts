import { IRequestExt } from "../../shared/interfaces/auth.interfaces";
import { AddRegardDto, TextDto } from "./dto/regard.dto";
import { Regard, RegardDocument } from "./regard.schema";
import mongoose, { Model } from 'mongoose';
import { CommonService } from "../../shared/services/common.service";
import { Text, TextDocument } from "./text.schema";
import { TextService } from "./text.service";
import { Qualify, QualifyDocument } from "./qualify.schema";
export declare class RegardService {
    regardModel: Model<RegardDocument>;
    private textModel;
    private qualifyModel;
    private commonService;
    private textService;
    constructor(regardModel: Model<RegardDocument>, textModel: Model<TextDocument>, qualifyModel: Model<QualifyDocument>, commonService: CommonService, textService: TextService);
    addRegard(body: AddRegardDto, req: IRequestExt): Promise<mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    createTextAndAddToRegard(file: Express.Multer.File, body: TextDto, regardId: string, req: IRequestExt): Promise<mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateText(file: Express.Multer.File, body: TextDto): Promise<mongoose.Document<unknown, {}, TextDocument> & Text & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    addTextToRegard(textId: string, regardId: string): Promise<mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    delRegard(regardId: string): Promise<mongoose.UpdateWriteOpResult>;
    delTextFromRegard(textId: string, regardId: string): Promise<mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    getRegards(req: IRequestExt): Promise<(mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getRegardAggregated(regardId: string): Promise<Omit<Omit<mongoose.Document<unknown, {}, RegardDocument> & Regard & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>, never>>;
    createQualify(body: any, regardId: string, req: IRequestExt): Promise<mongoose.Document<unknown, {}, QualifyDocument> & Qualify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    checkQualifyExec(body: any, { textId, regardId, qualifyId }: {
        textId: any;
        regardId: any;
        qualifyId: any;
    }, req: any): Promise<mongoose.Document<unknown, {}, QualifyDocument> & Qualify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    resetQualityTextLap({ textId, qualifyId, regardId }: {
        textId: any;
        qualifyId: any;
        regardId: any;
    }): Promise<mongoose.Document<unknown, {}, QualifyDocument> & Qualify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    markAsFinishQualityTextLap({ textId, qualifyId, regardId }: {
        textId: any;
        qualifyId: any;
        regardId: any;
    }): Promise<mongoose.Document<unknown, {}, QualifyDocument> & Qualify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    startNextLap(qualifyId: string): Promise<mongoose.Document<unknown, {}, QualifyDocument> & Qualify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findTexts(content: string): Promise<(mongoose.Document<unknown, {}, TextDocument> & Text & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
}
