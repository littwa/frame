import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScreenshotService } from 'src/modules/screenshot/screenshot.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/authorization/roles.decorator';
import { ERole } from 'src/shared/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateScreenshotDto, CreateScreenshotListDto, ParamIdScreenshotDto } from './dto/screenshot.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';

@Controller('screenshot')
export class ScreenshotController {
  constructor(private screenshotService: ScreenshotService) {}

  @ApiOperation({ summary: 'Create screenshots list' })
  @ApiResponse({ status: 201, description: 'Return created screenshot list.' })
  @ApiResponse({ status: 404, description: 'Can not create screenshot list.' })
  @ApiBearerAuth()
  @Post('add-list')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addScreenshotsList(@Body() body: CreateScreenshotListDto, @Req() req: IRequestExt) {
    return await this.screenshotService.addScreenshotsList(body, req);
  }

  @ApiOperation({ summary: 'Create screenshots and add to list' })
  @ApiResponse({ status: 201, description: 'Return created screenshots and add to list.' })
  @ApiResponse({ status: 404, description: 'Can not create screenshots and add to list.' })
  @ApiBearerAuth()
  @Post('add/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createScreenshotsAndAddToList(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateScreenshotDto,
    @Param() param: ParamIdScreenshotDto,
  ) {
    return this.screenshotService.createScreenshotsAndAddToList(files, body, param.id);
  }

  @ApiOperation({ summary: 'Del screenshots list' })
  @ApiResponse({ status: 204, description: 'Return del screenshots list.' })
  @ApiResponse({ status: 404, description: 'Can not del screenshots list.' })
  @ApiBearerAuth()
  @Delete('del-list/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delListAndScreenshots(@Param() param: ParamIdScreenshotDto) {
    return await this.screenshotService.delListAndScreenshots(param.id);
  }

  @ApiOperation({ summary: 'Get screenshots lists' })
  @ApiResponse({ status: 200, description: 'Return screenshots lists.' })
  @ApiResponse({ status: 404, description: 'Can not screenshots lists.' })
  @ApiBearerAuth()
  @Get('get-lists')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getScreenshotsLists(@Req() req: IRequestExt) {
    return this.screenshotService.getScreenshotsLists(req);
  }

  @ApiOperation({ summary: 'Get user screenshots list aggregate' })
  @ApiResponse({ status: 200, description: 'Return user list aggregate.' })
  @ApiResponse({ status: 404, description: 'Can not user list aggregate.' })
  @ApiBearerAuth()
  @Get('get-list/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getScreenshotsListAggregate(@Param() param: ParamIdScreenshotDto) {
    return this.screenshotService.getScreenshotsListAggregate(param.id);
  }
}
