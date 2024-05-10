import { ESortOrderBy } from '../enums/common.enum';

export interface IPagination {
    sort: ESortOrderBy;
    size: number;
    page: number;
}

export interface IResponseUploadCloudinary {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: any[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: string;
    url: string;
    secure_url: string;
    folder: string;
    api_key: string;
}
