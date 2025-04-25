import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';
// import axios from 'axios';

async function bootstrap() {
  console.log('process.env.NODE_ENV in bootstrap() =', process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'verbose'] }); // 'log'
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter)); // new AllExceptionsFilter()

  // const config = new DocumentBuilder()
  //   .addBearerAuth()
  //   .setTitle('Frame')
  //   .setDescription('The Frame API description')
  //   .setVersion('0.0.1')
  //   .addTag('frame')
  //   .build();
  //
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => console.log(' App was started port:', process.env.PORT || 3000));

// const url = `https://frame-oo45.onrender.com/`;
// const interval = 300000; // Interval in milliseconds(5m)
//
// function reloadWebsite() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
//     });
// }

// setInterval(reloadWebsite, interval);
