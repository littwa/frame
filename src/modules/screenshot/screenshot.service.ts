import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Screenshot, ScreenshotDocument } from 'src/modules/screenshot/screenshot.schema';
import { ScreenshotList, ScreenshotListDocument } from 'src/modules/screenshot/screenshot-list.schema';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import { CreateScreenshotListDto } from 'src/modules/screenshot/dto/screenshot.dto';

@Injectable()
export class ScreenshotService {
  constructor(@InjectModel(Screenshot.name) public screenshotModel: Model<ScreenshotDocument>,
              @InjectModel(ScreenshotList.name) public screenshotListModel: Model<ScreenshotListDocument>) {}

  async addScreenshotList(body: CreateScreenshotListDto, req: IRequestExt) {

    return this.screenshotListModel.create({ ...body, author: req.user.uid })
  }

  addScreenshot(body:string ='xxx') {
    // this.screenshotModel.find({})
    return this.screenshotModel.create({name: body})
  }


}
