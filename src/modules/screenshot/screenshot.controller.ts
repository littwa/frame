import { Controller, Post } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';

@Controller('screenshots')
export class ScreenshotController {
  constructor(private screenshotService: ScreenshotService) {
  }
  @Post('add')
  addScreenshot() {
    return this.screenshotService.addScreenshot()
  }
}
