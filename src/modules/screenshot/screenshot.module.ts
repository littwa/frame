import { Module } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Screenshot, ScreenshotSchema } from './screenshot.schema';
import { ScreenshotList, ScreenshotListSchema } from './screenshot-list.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Screenshot.name, schema: ScreenshotSchema },
    { name: ScreenshotList.name, schema: ScreenshotListSchema }
  ])],
  providers: [ScreenshotService],
  exports: [ScreenshotService]
})
export class ScreenshotModule {}
