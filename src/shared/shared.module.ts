import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { CommonService } from './services/common.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [CommonService, JwtService],
  imports: [MailModule],
  exports: [MailModule, CommonService],
})
export class SharedModule {}
