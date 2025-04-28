import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { EScreenshotType } from '../../../shared/enums/screenshot.enum';

export class ParamIdScreenshotDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}

export class CreateScreenshotListDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}

export class UpdateScreenshotDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly url?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly public_id?: string;

  @ApiProperty()
  @IsIn([EScreenshotType.English, EScreenshotType.IT, EScreenshotType.Other])
  @IsOptional()
  readonly old_file_type?: EScreenshotType;


  @ApiProperty()
  @IsIn([EScreenshotType.English, EScreenshotType.IT, EScreenshotType.Other])
  @IsOptional()
  readonly type?: EScreenshotType;
}

export class CreateScreenshotDto extends UpdateScreenshotDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

}
