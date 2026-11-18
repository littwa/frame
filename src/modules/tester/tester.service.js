"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tester_schema_1 = require("./tester.schema");
const tester_a_service_1 = require("./tester.a.service");
const tester_b_service_1 = require("./tester.b.service");
let TesterService = class TesterService {
    constructor(testerModel, testerAService, testerBService) {
        this.testerModel = testerModel;
        this.testerAService = testerAService;
        this.testerBService = testerBService;
        this.getTester = async () => {
            return null;
        };
        this.executeTester = async (param, query, body, req) => {
        };
    }
    async createTester(param, query, body, req) {
        const newTester = await this.testerModel.create({ ...body, createByUser: req.user.uid });
        if (!newTester)
            throw new common_1.NotFoundException(`Can't create Tester`);
        console.log('newTester=', newTester);
        return newTester;
    }
};
exports.TesterService = TesterService;
exports.TesterService = TesterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tester_schema_1.Tester.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tester_a_service_1.TesterAService,
        tester_b_service_1.TesterBService])
], TesterService);
//# sourceMappingURL=tester.service.js.map