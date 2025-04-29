import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Screenshot, ScreenshotDocument } from 'src/modules/screenshot/screenshot.schema';
import { ScreenshotList, ScreenshotListDocument } from 'src/modules/screenshot/screenshot-list.schema';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import { CreateScreenshotDto, CreateScreenshotListDto, } from 'src/modules/screenshot/dto/screenshot.dto';
import { CommonService } from 'src/shared/services/common.service';
import { EMediaType } from 'src/shared/enums/common.enum';

@Injectable()
export class ScreenshotService {
  constructor(
    @InjectModel(Screenshot.name) public screenshotModel: Model<ScreenshotDocument>,
    @InjectModel(ScreenshotList.name) public screenshotListModel: Model<ScreenshotListDocument>,
    public commonService: CommonService,
  ) {
  }

  async addScreenshotsList(body: CreateScreenshotListDto, req: IRequestExt) {
    return this.screenshotListModel.create({ ...body, author: req.user.uid, created: Date.now() });
  }

  async delListAndScreenshots(id: string): Promise<any> {

    const deleted = await this.screenshotListModel.findByIdAndDelete(id);
    const screenshot = await this.screenshotModel.deleteMany({ _id: { $in: deleted.screenshots } });

    let cloudinaryResponse = [];

    for(let i = 0; i < deleted.public_id_screenshots.length; i++) {
      const item = await this.commonService.deleteFromCloudinary(deleted.public_id_screenshots[i], EMediaType.Image);
      cloudinaryResponse.push(item);
    }
  }

  async createScreenshotsAndAddToList(files: Array<Express.Multer.File>, body: CreateScreenshotDto, listId: string) {
    let result;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const img = await this.commonService.cloudinaryHost(file, 'screenshot');
      const screenshot = await this.screenshotModel.create({
        // ...body,
        index: i,
        created: Date.now(),
        url: img?.secure_url || '',
        public_id: img?.public_id || '',
      });
      const screenshots = await this.screenshotListModel
        .findByIdAndUpdate(
          listId,
          {
            $push: { screenshots: screenshot._id, public_id_screenshots: screenshot.public_id },
          },
          { new: true, useFindAndModify: false },
        )
        .populate('screenshots');

      if (!screenshots) throw new NotFoundException(`Can't updated screenshots`);
      if (i === files.length - 1) result = screenshots;
    }

    return result;
  }

  async getScreenshotsLists(req: IRequestExt): Promise<any> {
    const lists = await this.screenshotListModel.find({ author: req.user.uid });
    if (!lists) throw new NotFoundException(`Can't find screenshots lists`);
    return lists;
  }

  async getScreenshotsListAggregate(listId: string): Promise<any> {
      const listAgg = await this.screenshotListModel.find({ _id: listId }).populate('screenshots');
      if (!listAgg) throw new NotFoundException(`Can't find list`);
    return listAgg[0];
  }
}
