import { Module } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Screenshot, ScreenshotSchema } from 'src/modules/screenshot/screenshot.schema';
import { ScreenshotList, ScreenshotListSchema } from 'src/modules/screenshot/screenshot-list.schema';
import { CommonService } from 'src/shared/services/common.service';
import { ScreenshotController } from 'src/modules/screenshot/screenshot.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Screenshot.name, schema: ScreenshotSchema },
      { name: ScreenshotList.name, schema: ScreenshotListSchema },
    ]),
  ],
  controllers: [ScreenshotController],
  providers: [ScreenshotService, CommonService],
  exports: [ScreenshotService],
})
export class ScreenshotModule {}
