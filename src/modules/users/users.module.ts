// import { Global, Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './user.schema';
// import { SharedModule } from 'src/shared/shared.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from 'src/strategies/jwt.strategy';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from 'src/authorization/roles.guard';
// import { Session, SessionSchema } from 'src/modules/users/session.schema';
// import { HttpModule } from '@nestjs/axios';
//
// @Global()
// @Module({
//     imports: [
//         MongooseModule.forFeature([
//             { name: User.name, schema: UserSchema },
//             { name: Session.name, schema: SessionSchema },
//         ]),
//         JwtModule.registerAsync({
//             useFactory: () => ({
//                 secret: process.env.TOKEN_SECRET,
//                 // signOptions: { expiresIn: '5d' }, // use if not to point in jwtService.sign({ expiresIn: '...'})
//             }),
//         }),
//         SharedModule,
//         PassportModule,
//         HttpModule,
//     ],
//     providers: [
//         UsersService,
//         JwtStrategy,
//         {
//             provide: APP_GUARD,
//             useClass: RolesGuard,
//         },
//     ],
//     controllers: [UsersController],
//     exports: [UsersService, MongooseModule],
// })
// export class UsersModule {}
