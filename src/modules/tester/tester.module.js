"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesterModule = exports.useClassTest = exports.ConfigServiceTest = void 0;
const common_1 = require("@nestjs/common");
const tester_service_1 = require("./tester.service");
const tester_controller_1 = require("./tester.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tester_schema_1 = require("./tester.schema");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const tester_a_service_1 = require("./tester.a.service");
const tester_b_service_1 = require("./tester.b.service");
const common_service_1 = require("../../shared/services/common.service");
let ConfigServiceTest = class ConfigServiceTest {
    constructor() {
        this.v = 'ConfigServiceTest';
    }
};
exports.ConfigServiceTest = ConfigServiceTest;
exports.ConfigServiceTest = ConfigServiceTest = __decorate([
    (0, common_1.Injectable)()
], ConfigServiceTest);
let DevelopmentConfigService = class DevelopmentConfigService {
    constructor() {
        this.v = 'DevelopmentConfigService';
    }
};
DevelopmentConfigService = __decorate([
    (0, common_1.Injectable)()
], DevelopmentConfigService);
let ProductionConfigService = class ProductionConfigService {
    constructor() {
        this.v = 'ProductionConfigService';
    }
};
ProductionConfigService = __decorate([
    (0, common_1.Injectable)()
], ProductionConfigService);
exports.useClassTest = {
    provide: 'UseClassTest',
    useClass: (() => {
        console.log('process.env.NODE_ENV in useClassTest provider =', process.env.NODE_ENV);
        return process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService;
    })(),
};
const useFactoryTest = {
    provide: 'UseFactoryTest',
    useFactory: async (configServiceTest, configService) => {
        console.log('useFactoryTest provider process.env.NODE_ENV = ', process.env.NODE_ENV);
        console.log('useFactoryTest provider configService.get(NODE_ENV) = ', configService.get('NODE_ENV'));
        console.log('useFactoryTest provider configServiceTest.v = ', configServiceTest.v);
        return process.env.NODE_ENV === 'development' ? new DevelopmentConfigService() : new ProductionConfigService();
    },
    inject: [ConfigServiceTest, config_1.ConfigService],
};
let TesterModule = class TesterModule {
};
exports.TesterModule = TesterModule;
exports.TesterModule = TesterModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tester_schema_1.Tester.name, schema: tester_schema_1.TesterSchema }]),
            axios_1.HttpModule,
        ],
        controllers: [tester_controller_1.TesterController],
        providers: [tester_service_1.TesterService, tester_a_service_1.TesterAService, tester_b_service_1.TesterBService, ConfigServiceTest, useFactoryTest, exports.useClassTest, common_service_1.CommonService],
        exports: [tester_service_1.TesterService, useFactoryTest, exports.useClassTest],
    })
], TesterModule);
//# sourceMappingURL=tester.module.js.map