import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConnectorService } from './mail-connector/mail-connector.service';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: MailConnectorService })],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
