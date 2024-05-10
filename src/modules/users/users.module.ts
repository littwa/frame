import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../authorization/roles.guard';
// import { OrdersModule } from 'src/orders/orders.module';
import { Session, SessionSchema } from './session.schema';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Session.name, schema: SessionSchema },
        ]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.TOKEN_SECRET,
                // signOptions: { expiresIn: '5d' }, // use if not to point in jwtService.sign({ expiresIn: '...'})
            }),
        }),
        SharedModule,
        PassportModule,
        // OrdersModule,
        HttpModule,
    ],
    providers: [
        UsersService,
        // GoogleStrategy,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [UsersController],
    exports: [UsersService, MongooseModule],
})
export class UsersModule {}
