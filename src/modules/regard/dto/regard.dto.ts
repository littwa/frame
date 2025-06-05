import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { ETextType } from 'src/shared/enums/regard.enum';

export class ParamIdRegardDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}

export class AddRegardDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}

export class CreateTextDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsArray()
  synonyms: string[];

  @ApiProperty()
  @IsArray()
  translation: string[];

  @ApiProperty()
  @IsIn([ETextType.Word, ETextType.Phrase, ETextType.Sentence])
  type: ETextType;
}

export class UpdateTextDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  content: string;

  @IsOptional()
  @ApiProperty()
  @IsArray()
  synonyms: string[];

  @IsOptional()
  @ApiProperty()
  @IsArray()
  translation: string[];

  @IsOptional()
  @ApiProperty()
  @IsIn([ETextType.Word, ETextType.Phrase, ETextType.Sentence])
  type: ETextType;
}
