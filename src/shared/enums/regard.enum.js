"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EQualifyAnswers = exports.EQualifyType = exports.ETextType = void 0;
var ETextType;
(function (ETextType) {
    ETextType["Word"] = "word";
    ETextType["Phrase"] = "phrase";
    ETextType["Sentence"] = "sentence";
})(ETextType || (exports.ETextType = ETextType = {}));
var EQualifyType;
(function (EQualifyType) {
    EQualifyType["Translate"] = "translate";
    EQualifyType["TranslateReverse"] = "translateReverse";
})(EQualifyType || (exports.EQualifyType = EQualifyType = {}));
var EQualifyAnswers;
(function (EQualifyAnswers) {
    EQualifyAnswers["Global"] = "global";
    EQualifyAnswers["Local"] = "local";
    EQualifyAnswers["InQualify"] = "inQualify";
    EQualifyAnswers["Essential"] = "essential";
})(EQualifyAnswers || (exports.EQualifyAnswers = EQualifyAnswers = {}));
//# sourceMappingURL=regard.enum.js.map