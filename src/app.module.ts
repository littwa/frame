import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './modules/users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import * as path from 'path';
// import configuration from 'src/config/base.config';
// import { ConfigModule } from '@nestjs/config';
// import { TesterModule } from './modules/tester/tester.module';

@Module({
  imports: [
    // PassportModule,
    // ConfigModule.forRoot({
    //   load: [configuration, () => ({ q: 1 })],
    //   isGlobal: true,
    //   envFilePath: ['.env'], // not necessary
    // }),
    // MongooseModule.forRoot(process.env.MONGO_URL),
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'uploads'),
    //   serveRoot: '/uploads',
    // }),
   //  UsersModule,
   // TesterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



//   "dotenv": "^16.5.0",
//   "mongoose": "^8.13.2",
//   "passport": "^0.7.0",
//   "passport-jwt": "^4.0.1",
//   "passport-local": "^1.0.0",
//   "sharp": "^0.34.1"
