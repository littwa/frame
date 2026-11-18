import { Model } from 'mongoose';
import { ScreenshotDocument } from "./screenshot.schema";
import { ScreenshotList, ScreenshotListDocument } from "./screenshot-list.schema";
import { IRequestExt } from "../../shared/interfaces/auth.interfaces";
import { CreateScreenshotDto, CreateScreenshotListDto } from "./dto/screenshot.dto";
import { CommonService } from "../../shared/services/common.service";
export declare class ScreenshotService {
    screenshotModel: Model<ScreenshotDocument>;
    screenshotListModel: Model<ScreenshotListDocument>;
    commonService: CommonService;
    constructor(screenshotModel: Model<ScreenshotDocument>, screenshotListModel: Model<ScreenshotListDocument>, commonService: CommonService);
    addScreenshotsList(body: CreateScreenshotListDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, ScreenshotListDocument> & ScreenshotList & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delListAndScreenshots(id: string): Promise<any>;
    createScreenshotsAndAddToList(files: Array<Express.Multer.File>, body: CreateScreenshotDto, listId: string): Promise<any>;
    getScreenshotsLists(req: IRequestExt): Promise<any>;
    getScreenshotsListAggregate(listId: string): Promise<any>;
}
