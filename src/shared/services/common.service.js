"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const url_constants_1 = require("../constants/url.constants");
const fs = __importStar(require("fs"));
const axios = __importStar(require("axios"));
const cloudinary = __importStar(require("cloudinary"));
const sharp_1 = __importDefault(require("sharp"));
const media_enum_1 = require("../enums/media.enum");
const config_1 = require("@nestjs/config");
let CommonService = class CommonService {
    constructor(configService) {
        this.configService = configService;
    }
    async sharpImgOptimize(image) {
        const sharpResponse = await (0, sharp_1.default)(image.buffer)
            .resize({ width: 960, withoutEnlargement: true })
            .webp({ lossless: true })
            .toBuffer();
        image.buffer = sharpResponse;
        return image;
    }
    async dictionaryApi(text) {
        const key = process.env.DICTIONARY_KEY;
        const req = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${text}?key=${key}`;
        let audio;
        let subdirectory;
        try {
            const response = await axios({
                method: 'GET',
                url: req,
            });
            audio = response.data[0].hwi.prs[0].sound.audio;
        }
        catch (err) {
            console.log(err);
            return '';
        }
        switch (true) {
            case audio.slice(0, 3) === 'bix':
                subdirectory = 'bix';
                break;
            case audio.slice(0, 2) === 'gg':
                subdirectory = 'gg';
                break;
            case this.containsNumberOrPunctuation(audio[0]):
                subdirectory = 'number';
                break;
            default:
                subdirectory = audio[0];
        }
        return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`;
    }
    async cloudinaryHost(file, prefix = 'frame') {
        if (!file)
            return;
        cloudinary.v2.config(this.configService.get('cloudinary'));
        let response;
        try {
            if (!Object.values(media_enum_1.EMediaType).includes(file.mimetype.split('/')[0]))
                new common_1.NotFoundException(`Wrong media type (mimetype)`);
            let resource_type;
            if (file.mimetype.split('/')[0] === media_enum_1.EMediaType.Image) {
                resource_type = media_enum_1.EMediaType.Image;
                file = await this.sharpImgOptimize(file);
            }
            else {
                resource_type = media_enum_1.EMediaType.Video;
            }
            const path = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            response = await cloudinary.v2.uploader.upload(path, {
                folder: resource_type + prefix,
                resource_type,
            });
        }
        catch (err) {
            console.log(err);
            throw new common_1.NotFoundException(err);
        }
        console.log('response::: ', response);
        return response;
    }
    async deleteFromCloudinary(public_id, type) {
        if (!public_id)
            return;
        cloudinary.v2.config(this.configService.get('cloudinary'));
        return await cloudinary.v2.api.delete_resources([public_id], {
            type: 'upload',
            resource_type: type === media_enum_1.EMediaType.Image ? media_enum_1.EMediaType.Image : media_enum_1.EMediaType.Video,
        });
    }
    multerFactory(files) {
        return files.map(file => {
            const uniqueSuffix = Date.now();
            const ext = '.webp';
            (0, sharp_1.default)(file.buffer)
                .resize(240, 240)
                .toFile(process.cwd() + '/uploads/' + uniqueSuffix + ext, (err, info) => console.log(1000666, err, info));
            return `${process.env.BASE_URL_API}/${url_constants_1.UPLOADS}/${uniqueSuffix}${ext}`;
        });
    }
    async getFileListing(directory) {
        const promise$$$ = new Promise((resolve, rej) => {
            fs.readdir(process.cwd() + '/uploads/static', (err, files) => {
                const results = new Array();
                files.forEach(file => {
                    console.log('file: ', `${process.env.BASE_URL_API}/${url_constants_1.UPLOADS}/${url_constants_1.STATIC}/${file}`);
                    results.push(`${process.env.BASE_URL_API}/${url_constants_1.UPLOADS}/${url_constants_1.STATIC}/${file}`);
                });
                resolve(results);
            });
        });
        console.log('promise- ', promise$$$);
        return promise$$$;
    }
    async getFileListingPath(directory) {
        const promise = new Promise((resolve, rej) => {
            fs.readdir(process.cwd() + '/uploads/static', (err, files) => {
                const results = files.map(file => `${url_constants_1.UPLOADS}/${url_constants_1.STATIC}/${file}`);
                resolve(results);
            });
        });
        return promise;
    }
    async imgbbHost(file) {
        const form = new FormData();
        form.append('image', file.buffer.toString('base64'));
        let response;
        try {
            response = await axios({
                method: 'POST',
                url: url_constants_1.IMGBB_UPLOAD_URL,
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        catch (err) {
            console.log(err);
        }
        return response.data;
    }
    containsNumberOrPunctuation(str) {
        const regex = /[\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
        return regex.test(str);
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CommonService);
//# sourceMappingURL=common.service.js.map