import { Model } from 'mongoose';
import { Tester, TesterDocument } from './tester.schema';
import { TesterAService } from './tester.a.service';
import { TesterBService } from './tester.b.service';
import { IRequestExt } from '../../shared/interfaces/auth.interfaces';
export declare class TesterService {
    private testerModel;
    private testerAService;
    private testerBService;
    constructor(testerModel: Model<TesterDocument>, testerAService: TesterAService, testerBService: TesterBService);
    getTester: () => Promise<any>;
    createTester(param: any, query: any, body: any, req: IRequestExt): Promise<import("mongoose").Document<unknown, {}, TesterDocument> & Tester & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    executeTester: (param: any, query: any, body: any, req: IRequestExt) => Promise<void>;
}
