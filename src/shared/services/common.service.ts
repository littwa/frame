import {Injectable, NotFoundException} from '@nestjs/common';
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
    IMGBB_UPLOAD_URL,
    STATIC,
    UPLOADS
} from 'src/shared/constants/url.constants';
import * as fs from 'fs';
import * as axios from 'axios';
import * as cloudinary from 'cloudinary';
import * as path from 'path';
import * as sharp from 'sharp';
import {EComposeType, EMediaType} from "../enums/compose.enum";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonService {
    // // private exp30days = this.configService.get('jwtExpires30days').exp;
    // private str60s = this.configService.get('jwtExpires60Seconds').exp;
    // private str30d = this.configService.get('jwtExpires30days').exp;
    // private exp30d =
    //     Date.now() + this.configService.get('jwtExpires30days').expIncrement;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(public configService: ConfigService) {} // @Inject('UseClassTest') public useClassTest: any, // @Inject('UseFactoryTest') public configFactory: any, // public configService: ConfigService, // private jwtService: JwtService, // private emailService: EmailService, // @InjectModel(User.name) public userModel: Model<UserDocument>, // @InjectModel(Session.name) public sessionModel: Model<SessionDocument>, // @InjectModel(Order.name) private productModel: Model<OrderDocument>,

    // getPairTokensUtilit = async (session, user) => {
    //     const accessToken = await this.jwtService.sign(
    //         {
    //             sid: session._id,
    //             uid: session.uid,
    //             secret: process.env.TOKEN_SECRET,
    //             email: user.email,
    //             role: user.role,
    //         },
    //         { expiresIn: '30d' },
    //     );
    //     const refreshToken = await this.jwtService.sign(
    //         {
    //             sid: session._id,
    //             uid: session.uid,
    //             secret: process.env.TOKEN_SECRET,
    //             email: user.email,
    //             role: user.role,
    //         },
    //         { expiresIn: '60d' },
    //     );
    //
    //     return { accessToken, refreshToken };
    // };

    multerFactory(files: Array<Express.Multer.File>): string[] {
        return files.map(file => {
            const uniqueSuffix = Date.now();
            const ext = '.webp'; //  path.parse(file.originalname).ext;
            // console.log(
            //   `${process.env.BASE_URL_API}/${UPLOADS}/${uniqueSuffix}${ext}`,
            // );
            sharp(file.buffer)
                .resize(240, 240)
                // .jpeg({ mozjpeg: true })
                .toFile(process.cwd() + '/uploads/' + uniqueSuffix + ext, (err, info) =>
                    console.log(1000666, err, info),
                );
            return `${process.env.BASE_URL_API}/${UPLOADS}/${uniqueSuffix}${ext}`;
        });
    }

    public async sharpImgOptimize(image: Express.Multer.File) {
        // const originalName = path.parse(image.originalname).name;
        // const filename = Date.now() + '-' + originalName + '.webp';

       const sharpResponse = await sharp(image.buffer)
            .resize({ width: 960, withoutEnlargement: true })
            .webp({ lossless: true }) // { effort: 0 }
           .toBuffer(); // .toFile(path.join('uploads', filename));

        image.buffer = sharpResponse;
        return image;
    }

    public async getFileListing(directory?: string): Promise<Array<string>> {
        const promise$$$ = new Promise((resolve, rej) => {
            fs.readdir(process.cwd() + '/uploads/static', (err, files) => {
                const results = new Array<string>();
                files.forEach(file => {
                    console.log('file: ', `${process.env.BASE_URL_API}/${UPLOADS}/${STATIC}/${file}`);
                    results.push(`${process.env.BASE_URL_API}/${UPLOADS}/${STATIC}/${file}`);
                });
                resolve(results);
            });
        });

        console.log('promise- ', promise$$$);
        return promise$$$ as Promise<Array<string>>;
    }

    public async getFileListingPath(directory?: string): Promise<Array<string>> {
        const promise = new Promise((resolve, rej) => {
            fs.readdir(process.cwd() + '/uploads/static', (err, files) => {
                const results = files.map(file => `${UPLOADS}/${STATIC}/${file}`);
                resolve(results);
            });
        });

        return promise as Promise<Array<string>>;
    }

    public async imgbbHost(file: Express.Multer.File) {
        const form: FormData = new FormData();
        form.append('image', file.buffer.toString('base64'));

        // console.log('form::: ', form);
        let response;

        try {
            // @ts-ignore
            response = await axios({
                method: 'POST',
                url: IMGBB_UPLOAD_URL,
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (err) {
            console.log(err);
        }

        return response.data;
    }

    public async cloudinaryHost(file: Express.Multer.File, prefix = 'sport') {
        if(!file) return;
        cloudinary.v2.config(this.configService.get('cloudinary'));

        let response: cloudinary.UploadApiResponse;

        try {
            if (!Object.values(EComposeType).includes(file.mimetype.split('/')[0] as EComposeType))
                new NotFoundException(`Wrong media type (mimetype)`);

            let resource_type: 'image' | 'video' | 'raw' | 'auto';
                // file.mimetype.split('/')[0] === EComposeType.Image ? EComposeType.Image : EComposeType.Video;


            if (file.mimetype.split('/')[0] === EComposeType.Image){
                resource_type = EComposeType.Image;
                file = await this.sharpImgOptimize(file);
            } else {
                // audio type assigned as video in cloudinary;
                resource_type = EComposeType.Video;
            }

            const path: string = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

            response = await cloudinary.v2.uploader.upload(path, {
                folder: resource_type + prefix,
                resource_type,
            });
        } catch (err) {
            console.log(err);
            throw new NotFoundException(err);
        }

        console.log('response::: ', response);

        return response;
    }

    public async deleteFromCloudinary(public_id: string, type: EComposeType | 'image') {
        if (!public_id) return;
        cloudinary.v2.config(this.configService.get('cloudinary'));
        return await cloudinary.v2.api.delete_resources([public_id], {
            type: 'upload',
            resource_type: type === EComposeType.Image ? EComposeType.Image : EComposeType.Video,
        });
    }
}
