import { Module } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Screenshot, ScreenshotSchema } from './screenshot.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Screenshot.name, schema: ScreenshotSchema}
  ])],
  providers: [ScreenshotService],
  exports: [ScreenshotService]
})
export class ScreenshotModule {}
