import { EQualifyAnswers, EQualifyType, ETextType } from "../../../shared/enums/regard.enum";
export declare class ParamIdDto {
    readonly id: string;
}
export declare class ParamIdTextRegardDto {
    readonly textId: string;
    readonly regardId: string;
}
export declare class ParamIdTextRegardQualifyDto {
    readonly textId: string;
    readonly regardId: string;
    readonly qualifyId: string;
}
export declare class AddRegardDto {
    readonly name: string;
}
export declare class TextDto {
    content: string;
    translation: string[];
    synonyms: string[];
    type: ETextType;
}
export declare class TextDtoFind {
    content: string;
}
export declare class UpdateTextDto {
    content: string;
    synonyms: string[];
    translation: string[];
    type: ETextType;
}
export declare class CreateQualifyDto {
    type: EQualifyType;
    repeat: number;
    answersVariant: EQualifyAnswers;
}
export declare class CheckQualifyDto {
    type: {
        [key: string]: any;
    };
}
