import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from '../users/session.schema';
import { Model } from 'mongoose';
import { Screenshot, ScreenshotDocument } from './screenshot.schema';

@Injectable()
export class ScreenshotService {
  constructor(@InjectModel(Screenshot.name) public screenshotModel: Model<ScreenshotDocument>,) {
  }

  addScreenshot(body:string ='xxx') {
    // this.screenshotModel.find({})
    return this.screenshotModel.create({name: body})
  }
}
