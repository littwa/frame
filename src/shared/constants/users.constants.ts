import { ESortOrderBy } from '../enums/common.enum';
import { IPagination } from '../interfaces/common.interfaces';

export const PAGINATION_USERS_DEFAULT: IPagination = {
    sort: ESortOrderBy.ASC,
    size: 10,
    page: 1,
};

export const GET_POSTS_BODY_DEFAULT = {
    pagination: PAGINATION_USERS_DEFAULT,
};
