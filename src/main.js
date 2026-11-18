"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./filters/http.exception.filter");
async function bootstrap() {
    console.log('process.env.NODE_ENV in bootstrap() =', process.env.NODE_ENV);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: ['error', 'warn', 'debug', 'verbose'] });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(httpAdapter));
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Frame')
        .setDescription('The Frame API description')
        .setVersion('0.0.1')
        .addTag('frame')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => console.log(' App was started port:', process.env.PORT || 3000));
//# sourceMappingURL=main.js.map