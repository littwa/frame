"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const screenshot_schema_1 = require("./screenshot.schema");
const screenshot_list_schema_1 = require("./screenshot-list.schema");
const common_service_1 = require("../../shared/services/common.service");
const common_enum_1 = require("../../shared/enums/common.enum");
let ScreenshotService = class ScreenshotService {
    constructor(screenshotModel, screenshotListModel, commonService) {
        this.screenshotModel = screenshotModel;
        this.screenshotListModel = screenshotListModel;
        this.commonService = commonService;
    }
    async addScreenshotsList(body, req) {
        return this.screenshotListModel.create({ ...body, author: req.user.uid, created: Date.now() });
    }
    async delListAndScreenshots(id) {
        const deleted = await this.screenshotListModel.findByIdAndDelete(id);
        const screenshot = await this.screenshotModel.deleteMany({ _id: { $in: deleted.screenshots } });
        const cloudinaryResponse = [];
        for (let i = 0; i < deleted.public_id_screenshots.length; i++) {
            const item = await this.commonService.deleteFromCloudinary(deleted.public_id_screenshots[i], common_enum_1.EMediaType.Image);
            cloudinaryResponse.push(item);
        }
    }
    async createScreenshotsAndAddToList(files, body, listId) {
        let result;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const img = await this.commonService.cloudinaryHost(file, 'screenshot');
            const screenshot = await this.screenshotModel.create({
                index: i,
                created: Date.now(),
                url: img?.secure_url || '',
                public_id: img?.public_id || '',
            });
            const screenshots = await this.screenshotListModel
                .findByIdAndUpdate(listId, {
                $push: { screenshots: screenshot._id, public_id_screenshots: screenshot.public_id },
            }, { new: true, useFindAndModify: false })
                .populate('screenshots');
            if (!screenshots)
                throw new common_1.NotFoundException(`Can't updated screenshots`);
            if (i === files.length - 1)
                result = screenshots;
        }
        return result;
    }
    async getScreenshotsLists(req) {
        const lists = await this.screenshotListModel.find({ author: req.user.uid });
        if (!lists)
            throw new common_1.NotFoundException(`Can't find screenshots lists`);
        return lists;
    }
    async getScreenshotsListAggregate(listId) {
        const listAgg = await this.screenshotListModel.find({ _id: listId }).populate('screenshots');
        if (!listAgg)
            throw new common_1.NotFoundException(`Can't find list`);
        return listAgg[0];
    }
};
exports.ScreenshotService = ScreenshotService;
exports.ScreenshotService = ScreenshotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(screenshot_schema_1.Screenshot.name)),
    __param(1, (0, mongoose_1.InjectModel)(screenshot_list_schema_1.ScreenshotList.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], ScreenshotService);
//# sourceMappingURL=screenshot.service.js.map