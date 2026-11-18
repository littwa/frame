"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETokenTypes = exports.EMediaType = exports.EFileType = exports.ESortOrderBy = void 0;
var ESortOrderBy;
(function (ESortOrderBy) {
    ESortOrderBy["ASC"] = "ASC";
    ESortOrderBy["DESC"] = "DESC";
})(ESortOrderBy || (exports.ESortOrderBy = ESortOrderBy = {}));
var EFileType;
(function (EFileType) {
    EFileType["Image"] = "image";
    EFileType["Video"] = "video";
    EFileType["Audio"] = "audio";
})(EFileType || (exports.EFileType = EFileType = {}));
var EMediaType;
(function (EMediaType) {
    EMediaType["Image"] = "image";
    EMediaType["Video"] = "video";
    EMediaType["Audio"] = "auto";
    EMediaType["Raw"] = "raw";
})(EMediaType || (exports.EMediaType = EMediaType = {}));
var ETokenTypes;
(function (ETokenTypes) {
    ETokenTypes["Refresh"] = "refresh";
    ETokenTypes["Access"] = "access";
})(ETokenTypes || (exports.ETokenTypes = ETokenTypes = {}));
//# sourceMappingURL=common.enum.js.map