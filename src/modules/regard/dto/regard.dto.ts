import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { ETextType } from 'src/shared/enums/regard.enum';

export class ParamIdDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}

export class ParamIdTextRegardDto {
  @ApiProperty()
  @IsString()
  readonly textId: string;

  @ApiProperty()
  @IsString()
  readonly regardId: string;

  @ApiProperty()
  @IsString()
  readonly idxText: string
}

export class AddRegardDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}

export class TextDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsArray()
  translation: string[];

  @IsOptional()
  @ApiProperty()
  @IsArray()
  synonyms: string[];

  @IsOptional()
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
