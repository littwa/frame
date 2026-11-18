import { ScreenshotService } from "./screenshot.service";
import { CreateScreenshotDto, CreateScreenshotListDto, ParamIdScreenshotDto } from './dto/screenshot.dto';
import { IRequestExt } from "../../shared/interfaces/auth.interfaces";
export declare class ScreenshotController {
    private screenshotService;
    constructor(screenshotService: ScreenshotService);
    addScreenshotsList(body: CreateScreenshotListDto, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./screenshot-list.schema").ScreenshotListDocument> & import("./screenshot-list.schema").ScreenshotList & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createScreenshotsAndAddToList(files: Array<Express.Multer.File>, body: CreateScreenshotDto, param: ParamIdScreenshotDto): Promise<any>;
    delListAndScreenshots(param: ParamIdScreenshotDto): Promise<any>;
    getScreenshotsLists(req: IRequestExt): Promise<any>;
    getScreenshotsListAggregate(param: ParamIdScreenshotDto): Promise<any>;
}
