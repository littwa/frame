import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Screenshot,
  ScreenshotDocument,
} from 'src/modules/screenshot/screenshot.schema';
import {
  ScreenshotList,
  ScreenshotListDocument,
} from 'src/modules/screenshot/screenshot-list.schema';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import {
  CreateScreenshotDto,
  CreateScreenshotListDto,
} from 'src/modules/screenshot/dto/screenshot.dto';
import { CommonService } from 'src/shared/services/common.service';
import { EMediaType } from '../../shared/enums/common.enum';

@Injectable()
export class ScreenshotService {
  constructor(
    @InjectModel(Screenshot.name)
    public screenshotModel: Model<ScreenshotDocument>,
    @InjectModel(ScreenshotList.name)
    public screenshotListModel: Model<ScreenshotListDocument>,
    public commonService: CommonService,
  ) {}

  async addScreenshotsList(body: CreateScreenshotListDto, req: IRequestExt) {
    return this.screenshotListModel.create({
      ...body,
      author: req.user.uid,
      created: Date.now(),
    });
  }

  async delListAndScreenshots(id: string): Promise<any> {

    const deleted = await this.screenshotListModel.findByIdAndDelete(id);
    const screenshot = await this.screenshotModel.deleteMany({
      _id: { $in: deleted.list },
    });

    let cloudinaryResponse = [];

    for(let i = 0; i < deleted.public_id_list.length; i++) {
      const item = await this.commonService.deleteFromCloudinary(deleted.public_id_list[i], EMediaType.Image);
      cloudinaryResponse.push(item);
    }

    console.log('deleted, screenshots===', deleted, screenshot);
    console.log('cloudinaryResponse==', cloudinaryResponse);
  }

  async createScreenshotsAndAddToList(
    files: Array<Express.Multer.File>,
    body: CreateScreenshotDto,
    listId: string,
  ) {
    console.log('files==', files);
    console.log('body== ', body);
    console.log('listId==', listId);

    let result;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log('start ======== upload file');
      const img = await this.commonService.cloudinaryHost(file, 'screenshot');
      console.log('start screenshotModel.create', i);
      const screenshot = await this.screenshotModel.create({
        // ...body,
        index: i,
        created: Date.now(),
        url: img?.secure_url || '',
        public_id: img?.public_id || '',
      });
      const list = await this.screenshotListModel
        .findByIdAndUpdate(
          listId,
          {
            $push: { list: screenshot._id, public_id_list: screenshot.public_id },
          },
          { new: true, useFindAndModify: false },
        )
        .populate('list');

      console.log('end ================ upload file');

      if (!list) throw new NotFoundException(`Can't updated list`);
      if (i === files.length - 1) result = list;
    }

    console.log('result==', result);
    return result;
  }
}
