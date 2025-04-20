export enum ESortOrderBy {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum EFileType {
    Image = 'image',
    Video = 'video',
    Audio = 'audio',
}

export enum EMediaType {
    Image = 'image',
    Video = 'video',
    Audio = 'auto',
    Raw = 'raw'
}

export enum ETokenTypes {
    Refresh = 'refresh',
    Access = 'access',
}

export type MediaTypes = 'image' | 'video' |'auto' |'raw';
