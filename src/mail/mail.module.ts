import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Replace with your SMTP host
        port: 587,
        secure: false, // true for port 465, false for other ports, 587
        auth: {
          user: 'devacclyt@gmail.com', // Replace with your SMTP user
          pass: 'nvmh xbkl mndx cuxw', // Replace with your SMTP password
        },
      },
      defaults: {
        from: '"No Reply" <xxx@xxx.com>', // Default sender address
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
