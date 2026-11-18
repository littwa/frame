import { TesterService } from './tester.service';
import { ExecuteTesterBodyDto, ExecuteTesterParamDto, ExecuteTesterQueryDto, TesterDto } from './dto/testers.dto';
import { IRequestExt } from "../../shared/interfaces/auth.interfaces";
import { CommonService } from '../../shared/services/common.service';
export declare class TesterController {
    private testerService;
    private commonService;
    constructor(testerService: TesterService, commonService: CommonService);
    getProducts(): Promise<any>;
    createTester(body: TesterDto, param: any, query: any, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, import("./tester.schema").TesterDocument> & import("./tester.schema").Tester & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    executeTester(body: ExecuteTesterBodyDto, param: ExecuteTesterParamDto, query: ExecuteTesterQueryDto, req: IRequestExt): {
        query: ExecuteTesterQueryDto;
        param: ExecuteTesterParamDto;
        body: ExecuteTesterBodyDto;
    };
    simpleTest(files?: Array<Express.Multer.File>): string;
    baseTest(): string;
}
