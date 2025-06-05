import {
  Body,
  Controller, Delete,
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
import { AddRegardDto, CreateTextDto, ParamIdRegardDto } from 'src/modules/regard/dto/regard.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

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
                                      @Body() body: CreateTextDto,
                                      @Param() param: ParamIdRegardDto) {
    return this.regardService.createTextAndAddToRegard(files[0], body, param.id);
  }

  @ApiOperation({ summary: 'Add Text to Regard' })
  @ApiResponse({ status: 201, description: 'Return added Text to Regard.' })
  @ApiResponse({ status: 404, description: 'Can not added Text to Regard.' })
  @ApiBearerAuth()
  @Post('add-text/:id')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addTextToRegard(@Param() paramText: ParamIdRegardDto,
                                 @Param() paramRegard: ParamIdRegardDto) {
    return this.regardService.addTextToRegard(paramText.id, paramRegard.id);
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
  async delRegard(@Param() param: ParamIdRegardDto) {
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
  async updateText(@UploadedFiles() files: Array<Express.Multer.File>, @Param() param: ParamIdRegardDto, @Body()body: any) {
    return await this.regardService.updateText(files[0], body, param.id);
  }
}
