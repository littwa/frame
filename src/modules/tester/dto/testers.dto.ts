import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ETesterDistinct, ETesterNum, ETesterSize, ETesterStatus } from 'src/shared/enums/tester.enum';

export class TesterDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly description: string;

    @ApiProperty({ enum: ['a', 'b', 'c'] })
    @IsIn(['a', 'b', 'c'])
    @IsString()
    readonly status: ETesterStatus;

    @ApiProperty({ enum: ['xxx', 'yyy', 'zzz'] })
    @IsIn(['xxx', 'yyy', 'zzz'])
    @IsString()
    readonly distinct: ETesterDistinct;

    @ApiProperty({ enum: ['s', 'm', 'l', 'xl'] })
    @IsIn(['s', 'm', 'l', 'xl'])
    readonly size: ETesterSize;

    @ApiProperty({ enum: [1, 2, 3] })
    @IsIn([1, 2, 3])
    readonly num: ETesterNum;

    // @ApiProperty({ enum: ['new', 'canceled', 'in progress', 'delivered', 'completed'] })
    // @IsString()
    // @IsIn(['new', 'canceled', 'in progress', 'delivered', 'completed'])
    // readonly status: EOrderStatus;

    // @IsOptional()
    // @Length(24, 24)
    // @IsOptional()
    // @ApiPropertyOptional({ type: String, maxLength: 24, minLength: 24 })
    // readonly userId: string;
}

export class ExecuteTesterParamDto {
    @ApiProperty()
    @IsString()
    readonly testerId: string;

    @ApiPropertyOptional({ enum: ['a', 'b', 'c'] })
    @IsIn(['a', 'b', 'c'])
    @IsOptional()
    readonly qwe: ETesterStatus;
}

export class ExecuteTesterQueryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly g: string;

    @ApiPropertyOptional({ enum: ['a', 'b', 'c'] })
    @IsIn(['a', 'b', 'c'])
    @IsOptional()
    readonly h: ETesterStatus;

    @ApiPropertyOptional({ enum: ['s', 'm', 'l', 'xl'] })
    @IsIn(['s', 'm', 'l', 'xl'])
    @IsOptional()
    readonly s: ETesterSize;
}

export class ExecuteTesterBodyDto {
    @ApiProperty({ enum: [1, 2, 3], example: 3 })
    @IsIn([1, 2, 3])
    readonly bodyF2: ETesterNum;

    @ApiPropertyOptional({ enum: ['a', 'b', 'c'] })
    @IsIn(['a', 'b', 'c'])
    @IsOptional()
    readonly bodyF1: ETesterStatus;
}
