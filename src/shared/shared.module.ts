import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { CommonService } from './services/common.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [CommonService, JwtService],
    imports: [EmailModule],
    exports: [EmailModule, CommonService],
})
export class SharedModule {}
