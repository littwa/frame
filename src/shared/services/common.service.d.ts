import * as cloudinary from 'cloudinary';
import { EMediaType } from '../enums/media.enum';
import { ConfigService } from '@nestjs/config';
export declare class CommonService {
    configService: ConfigService;
    constructor(configService: ConfigService);
    sharpImgOptimize(image: Express.Multer.File): Promise<Express.Multer.File>;
    dictionaryApi(text: string): Promise<string>;
    cloudinaryHost(file: Express.Multer.File, prefix?: string): Promise<cloudinary.UploadApiResponse>;
    deleteFromCloudinary(public_id: string, type: EMediaType | 'image'): Promise<any>;
    multerFactory(files: Array<Express.Multer.File>): string[];
    getFileListing(directory?: string): Promise<Array<string>>;
    getFileListingPath(directory?: string): Promise<Array<string>>;
    imgbbHost(file: Express.Multer.File): Promise<any>;
    containsNumberOrPunctuation(str: string): boolean;
}
