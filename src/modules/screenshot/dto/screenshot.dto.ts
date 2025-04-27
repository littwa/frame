import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateScreenshotListDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}
