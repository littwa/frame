import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScreenshotService } from 'src/modules/screenshot/screenshot.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/authorization/roles.decorator';
import { ERole } from 'src/shared/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('screenshot')
export class ScreenshotController {
  constructor(private screenshotService: ScreenshotService) {
  }

  @ApiOperation({ summary: 'Create screenshot list' })
  @ApiResponse({ status: 201, description: 'Return created screenshot list.' })
  @ApiResponse({ status: 404, description: 'Can not create screenshot list.' })
  @ApiBearerAuth()
  @Post('add-list')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addComposeList(@Body() body: any, @Req() req) {
    return await this.screenshotService.addScreenshotList(body, req);
  }


  @Post('add')
  addScreenshot() {
    return this.screenshotService.addScreenshot()
  }
}
