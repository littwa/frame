import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { EQualifyAnswers, EQualifyType, ETextType } from 'src/shared/enums/regard.enum';

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
}

export class ParamIdTextRegardQualifyDto {
  @ApiProperty()
  @IsString()
  readonly textId: string;

  @ApiProperty()
  @IsString()
  readonly regardId: string;

  @ApiProperty()
  @IsString()
  readonly qualifyId: string;
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

export class TextDtoFind {
  @ApiProperty()
  @IsString()
  content: string;
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

export class CreateQualifyDto {
  @ApiProperty()
  @IsIn([EQualifyType.Translate, EQualifyType.TranslateReverse])
  type: EQualifyType;

  @IsOptional()
  @ApiProperty()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  repeat: number;

  @IsOptional()
  @ApiProperty()
  @IsIn([EQualifyAnswers.Global, EQualifyAnswers.InQualify, EQualifyAnswers.Local, EQualifyAnswers.Essential])
  answersVariant: EQualifyAnswers;
}

export class CheckQualifyDto {
  @IsOptional()
  @ApiProperty()
  @IsObject()
  type: { [key: string]: any };
}
