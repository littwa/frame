import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ParamIdDto {
    @ApiProperty()
    @IsString()
    @Length(24, 24)
    readonly id: string;
}
