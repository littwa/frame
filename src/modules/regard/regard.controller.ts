import {
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus, Param, Patch,
  Post,
  Req, UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegardService } from 'src/modules/regard/regard.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/authorization/roles.decorator';
import { ERole } from 'src/shared/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import { AddRegardDto, TextDto, ParamIdDto, ParamIdTextRegardDto } from 'src/modules/regard/dto/regard.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ParamIdScreenshotDto } from '../screenshot/dto/screenshot.dto';

@Controller('regard')
export class RegardController {

  constructor(private regardService: RegardService) {}

  @ApiOperation({ summary: 'Add Regard' })
  @ApiResponse({ status: 201, description: 'Return added Regard.' })
  @ApiResponse({ status: 404, description: 'Can not add Regard.' })
  @ApiBearerAuth()
  @Post('add-regard')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addRegard(@Body() body: AddRegardDto, @Req() req: IRequestExt) {
    return await this.regardService.addRegard(body, req);
  }

  @ApiOperation({ summary: 'Create Text and add to Regard' })
  @ApiResponse({ status: 201, description: 'Return created Text and add to Regard.' })
  @ApiResponse({ status: 404, description: 'Can not create Text and add to Regard.' })
  @ApiBearerAuth()
  @Post('create-add-text/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTextAndAddToRegard(@UploadedFiles() files: Array<Express.Multer.File>,
                                      @Body() body: TextDto,
                                      @Param() param: ParamIdDto,
                                      @Req() req: IRequestExt) {
    return this.regardService.createTextAndAddToRegard(files[0], body, param.id, req);
  }

  @ApiOperation({ summary: 'Add Text to Regard' })
  @ApiResponse({ status: 201, description: 'Return added Text to Regard.' })
  @ApiResponse({ status: 404, description: 'Can not added Text to Regard.' })
  @ApiBearerAuth()
  @Post('add-text/:textId/:regardId')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addTextToRegard(@Param() param: ParamIdTextRegardDto) {
    return this.regardService.addTextToRegard(param.textId, param.regardId);
  }

  @ApiOperation({ summary: 'Del Regard' })
  @ApiResponse({ status: 204, description: 'Return del Regard list.' })
  @ApiResponse({ status: 404, description: 'Can not del Regard list.' })
  @ApiBearerAuth()
  @Delete('del-regard/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delRegard(@Param() param: ParamIdDto) {
    return await this.regardService.delRegard(param.id);
  }

  @ApiOperation({ summary: 'Update Text' })
  @ApiResponse({ status: 201, description: 'Return update Text.' })
  @ApiResponse({ status: 404, description: 'Can not update Text.' })
  @ApiBearerAuth()
  @Patch('update-text/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.CREATED)
  async updateText(@UploadedFiles() files: Array<Express.Multer.File>, @Param() param: ParamIdDto, @Body()body: any) {
    return await this.regardService.updateText(files[0], body);
  }

  @ApiOperation({ summary: 'Del Text from Regard' })
  @ApiResponse({ status: 201, description: 'Return Regard.' })
  @ApiResponse({ status: 404, description: 'Can not del Text from Regard.' })
  @ApiBearerAuth()
  @Delete('del-text/:textId/:regardId/:idxText')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async delTextFromRegard(@Param() param: ParamIdTextRegardDto) {
    return await this.regardService.delTextFromRegard(param.textId, param.regardId, param.idxText);
  }

  @ApiOperation({ summary: 'Get regards lists' })
  @ApiResponse({ status: 200, description: 'Return regards lists.' })
  @ApiResponse({ status: 404, description: 'Can not get regards lists.' })
  @ApiBearerAuth()
  @Get('get-regards')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRegards(@Req() req: IRequestExt) {
    return this.regardService.getRegards(req);
  }

  @ApiOperation({ summary: 'Get user regard aggregated' })
  @ApiResponse({ status: 200, description: 'Return user regard aggregated.' })
  @ApiResponse({ status: 404, description: 'Can not get user regard aggregated.' })
  @ApiBearerAuth()
  @Get('get-regard/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRegardAggregated(@Param() param: ParamIdDto) {
    return this.regardService.getRegardAggregated(param.id);
  }

  @ApiOperation({ summary: 'Create Qualify' })
  @ApiResponse({ status: 201, description: 'Return created Qualify' })
  @ApiResponse({ status: 404, description: 'Can not create Qualify.' })
  @ApiBearerAuth()
  @Post('create-qualify/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createQualify(@Body() body: TextDto,
                                 @Param() param: ParamIdDto,
                                 @Req() req: IRequestExt) {
    return this.regardService.createQualify(body, param.id, req);
  }
}
