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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const regard_schema_1 = require("./regard.schema");
const mongoose_2 = __importStar(require("mongoose"));
const common_service_1 = require("../../shared/services/common.service");
const text_schema_1 = require("./text.schema");
const text_service_1 = require("./text.service");
const qualify_schema_1 = require("./qualify.schema");
const media_enum_1 = require("../../shared/enums/media.enum");
let RegardService = class RegardService {
    constructor(regardModel, textModel, qualifyModel, commonService, textService) {
        this.regardModel = regardModel;
        this.textModel = textModel;
        this.qualifyModel = qualifyModel;
        this.commonService = commonService;
        this.textService = textService;
    }
    async addRegard(body, req) {
        return this.regardModel.create({
            ...body,
            author: req.user.uid,
            created: Date.now(),
        });
    }
    async createTextAndAddToRegard(file, body, regardId, req) {
        const foundText = await this.textModel.findOne({ content: body.content });
        if (foundText) {
            throw new common_1.NotFoundException(`Text with such content is already exist`);
        }
        const pronunciation = await this.commonService.dictionaryApi(body.content);
        const img = await this.commonService.cloudinaryHost(file, 'regard');
        const text = await this.textModel.create({
            ...body,
            regards: [],
            pronunciation,
            img: img?.secure_url || '',
            public_id: img?.public_id || '',
            created: Date.now(),
            author: req.user.uid,
        });
        return await this.addTextToRegard(text._id, regardId);
    }
    async updateText(file, body) {
        const foundText = await this.textModel.findOne({ content: body.content });
        const pronunciation = await this.commonService.dictionaryApi(body.content);
        const img = await this.commonService.cloudinaryHost(file, 'regard');
        if (img && foundText.public_id) {
            await this.commonService.deleteFromCloudinary(foundText.public_id, media_enum_1.EMediaType.Image);
        }
        return this.textModel.findOneAndUpdate({ content: body.content }, {
            ...body,
            pronunciation,
            img: img?.secure_url || '',
            public_id: img?.public_id || '',
        }, {
            new: true,
        });
    }
    async addTextToRegard(textId, regardId) {
        const regard = await this.regardModel
            .findOneAndUpdate({
            $and: [{ _id: regardId }, { list: { $nin: [textId] } }],
        }, {
            $push: { list: textId },
        }, { new: true })
            .populate('list');
        console.log(10000987, regard);
        if (!regard)
            throw new common_1.NotFoundException(`Can't updated Regard`);
        const text = await this.textModel.findByIdAndUpdate(textId, {
            $push: { regards: regardId },
        });
        if (!text)
            throw new common_1.NotFoundException(`Can't updated Text`);
        return regard;
    }
    async delRegard(regardId) {
        const deletedRegard = await this.regardModel.findByIdAndDelete(regardId);
        return this.textModel.updateMany({
            _id: { $in: deletedRegard.list },
        }, {
            $pull: { regards: regardId },
        });
    }
    async delTextFromRegard(textId, regardId) {
        const regard = await this.regardModel
            .findByIdAndUpdate(regardId, {
            $pull: { list: textId },
        }, { new: true })
            .populate('list');
        return regard;
    }
    async getRegards(req) {
        const regards = await this.regardModel.find({ author: req.user.uid });
        if (!regards)
            throw new common_1.NotFoundException(`Can't find regard lists`);
        return regards;
    }
    async getRegardAggregated(regardId) {
        const regard = await this.regardModel.find({ _id: regardId }).populate('list').populate('qualifies');
        if (!regard)
            throw new common_1.NotFoundException(`Can't get regard`);
        return regard[0];
    }
    async createQualify(body, regardId, req) {
        const regard = await this.regardModel.findById(regardId).exec();
        const progress = regard.list.reduce((acc, textId, i) => {
            console.log('textId:_', textId);
            acc[`${textId}`] = 0;
            return acc;
        }, {});
        const stat = regard.list.map((v, i) => ({
            textId: v,
            amount: 0,
            checkedAmount: 0,
            lapChecked: false,
            finishedInQualify: false,
            obj: { idx: i },
        }));
        const qualify = await this.qualifyModel.create({
            ...body,
            progress,
            stat,
            regard: new mongoose_2.default.Types.ObjectId(regardId),
            author: req.user.uid,
            created: Date.now(),
        });
        regard.qualifies.push(qualify._id);
        regard.qualifyInProgress = true;
        regard.qualifyAmount = regard.qualifyAmount + 1;
        await regard.save();
        const texts = await this.textModel.updateMany({ _id: { $in: regard.list } }, {
            $push: {
                qualifies: qualify._id,
            },
        });
        return qualify;
    }
    async checkQualifyExec(body, { textId, regardId, qualifyId }, req) {
        const qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();
        qualify.progress[textId] = qualify.progress[textId] + 1;
        let finishedLap = true;
        let finished = true;
        qualify.stat = qualify.stat.map(v => {
            if (v.amount === qualify.repeat && v.textId.toString() === textId)
                throw new common_1.NotFoundException(`Can't Check Text(Over amount)`);
            const value = v.textId.toString() === textId
                ? {
                    ...v,
                    lapChecked: true,
                    amount: v.amount + 1,
                    checkedAmount: v.checkedAmount + 1,
                    ...(qualify.repeat === v.amount + 1 && {
                        finishedInQualify: true,
                    }),
                }
                : v;
            finishedLap = value.lapChecked ? finishedLap : false;
            finished = value.amount === qualify.repeat ? finished : false;
            return value;
        });
        qualify.finishedLap = finishedLap;
        qualify.finished = finished;
        await this.regardModel.findByIdAndUpdate(regardId, {
            $set: {
                qualifyInProgress: !finished,
            },
        });
        qualify.markModified('progress');
        qualify.markModified('stat');
        await qualify.save();
        await this.textModel.findByIdAndUpdate(textId, {
            $push: {
                statistics: `${qualifyId}_${Date.now()}`,
            },
        });
        return qualify;
    }
    async resetQualityTextLap({ textId, qualifyId, regardId }) {
        const qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();
        qualify.stat = qualify.stat.map(v => {
            const value = v.textId.toString() === textId
                ? {
                    ...v,
                    amount: 0,
                    ...(!qualify.finishedLap && { lapChecked: false }),
                    finishedInQualify: false,
                }
                : v;
            return value;
        });
        qualify.markModified('progress');
        qualify.markModified('stat');
        if (qualify.finished) {
            await this.regardModel.findByIdAndUpdate(regardId, {
                $set: {
                    qualifyInProgress: true,
                },
            });
        }
        qualify.progress[textId] = 0;
        qualify.finished = false;
        await qualify.save();
        return qualify;
    }
    async markAsFinishQualityTextLap({ textId, qualifyId, regardId }) {
        const qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();
        qualify.progress[textId] = qualify.repeat;
        let finished = true;
        qualify.stat = qualify.stat.map(v => {
            const value = v.textId.toString() === textId
                ? {
                    ...v,
                    amount: qualify.repeat,
                    lapChecked: true,
                    finishedInQualify: true,
                }
                : v;
            finished = value.amount === qualify.repeat ? finished : false;
            return value;
        });
        await this.regardModel.findByIdAndUpdate(regardId, {
            $set: {
                qualifyInProgress: !finished,
            },
        });
        qualify.finished = finished;
        qualify.markModified('progress');
        qualify.markModified('stat');
        await qualify.save();
        return qualify;
    }
    async startNextLap(qualifyId) {
        const qualify = await this.qualifyModel.findById(qualifyId).exec();
        if (!qualify.finishedLap)
            throw new common_1.NotFoundException(`Preceding lap not finished yet`);
        qualify.stat = qualify.stat.map(v => (!v.finishedInQualify ? { ...v, lapChecked: false } : v));
        qualify.finishedLap = false;
        qualify.markModified('stat');
        await qualify.save();
        return qualify;
    }
    async findTexts(content) {
        return this.textModel.find({ content: { $regex: content, $options: 'i' } }).limit(15);
    }
};
exports.RegardService = RegardService;
exports.RegardService = RegardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(regard_schema_1.Regard.name)),
    __param(1, (0, mongoose_1.InjectModel)(text_schema_1.Text.name)),
    __param(2, (0, mongoose_1.InjectModel)(qualify_schema_1.Qualify.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService,
        text_service_1.TextService])
], RegardService);
//# sourceMappingURL=regard.service.js.map