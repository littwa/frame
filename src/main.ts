import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';

async function bootstrap() {
  console.log('process.env.NODE_ENV in bootstrap() =', process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'verbose'] }); // 'log'
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter)); // , new AllExceptionsFilter()

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sport')
    .setDescription('The Sport API description')
    .setVersion('0.0.1')
    .addTag('sport')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => console.log(' App was started port:', process.env.PORT || 3000));
