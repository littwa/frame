import { EScreenshotType } from '../../../shared/enums/screenshot.enum';
export declare class ParamIdScreenshotDto {
    readonly id: string;
}
export declare class CreateScreenshotListDto {
    readonly name: string;
}
export declare class UpdateScreenshotDto {
    readonly name?: string;
    readonly description?: string;
    readonly url?: string;
    readonly public_id?: string;
    readonly old_file_type?: EScreenshotType;
    readonly type?: EScreenshotType;
}
export declare class CreateScreenshotDto extends UpdateScreenshotDto {
    readonly name: string;
}
