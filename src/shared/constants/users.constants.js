"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_POSTS_BODY_DEFAULT = exports.PAGINATION_USERS_DEFAULT = void 0;
const common_enum_1 = require("../enums/common.enum");
exports.PAGINATION_USERS_DEFAULT = {
    sort: common_enum_1.ESortOrderBy.ASC,
    size: 10,
    page: 1,
};
exports.GET_POSTS_BODY_DEFAULT = {
    pagination: exports.PAGINATION_USERS_DEFAULT,
};
//# sourceMappingURL=users.constants.js.map