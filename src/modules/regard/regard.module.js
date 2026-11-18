"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegardModule = void 0;
const common_1 = require("@nestjs/common");
const regard_service_1 = require("./regard.service");
const regard_controller_1 = require("./regard.controller");
const mongoose_1 = require("@nestjs/mongoose");
const regard_schema_1 = require("./regard.schema");
const text_schema_1 = require("./text.schema");
const common_service_1 = require("../../shared/services/common.service");
const text_service_1 = require("./text.service");
const qualify_schema_1 = require("./qualify.schema");
let RegardModule = class RegardModule {
};
exports.RegardModule = RegardModule;
exports.RegardModule = RegardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: regard_schema_1.Regard.name, schema: regard_schema_1.RegardSchema },
                { name: text_schema_1.Text.name, schema: text_schema_1.TextSchema },
                { name: qualify_schema_1.Qualify.name, schema: qualify_schema_1.QualifySchema },
            ]),
        ],
        providers: [regard_service_1.RegardService, common_service_1.CommonService, text_service_1.TextService],
        controllers: [regard_controller_1.RegardController],
    })
], RegardModule);
//# sourceMappingURL=regard.module.js.map