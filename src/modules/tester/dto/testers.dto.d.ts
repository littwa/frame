import { ETesterDistinct, ETesterNum, ETesterSize, ETesterStatus } from "../../../shared/enums/tester.enum";
export declare class TesterDto {
    readonly name: string;
    readonly description: string;
    readonly status: ETesterStatus;
    readonly distinct: ETesterDistinct;
    readonly size: ETesterSize;
    readonly num: ETesterNum;
}
export declare class ExecuteTesterParamDto {
    readonly testerId: string;
    readonly qwe: ETesterStatus;
}
export declare class ExecuteTesterQueryDto {
    readonly g: string;
    readonly h: ETesterStatus;
    readonly s: ETesterSize;
}
export declare class ExecuteTesterBodyDto {
    readonly bodyF2: ETesterNum;
    readonly bodyF1: ETesterStatus;
}
