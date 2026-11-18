import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async tstMail() {
    return 'mail service ok';
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    console.log(this.mailerService.getTransporter());
    try {
      await this.mailerService.sendMail({
        to: to, // to, // Recipient address heeekq@gmail.com lll0000@bigmir.net
        from: "'No Replay message' <noreply@yourdomain.com>",
        // sender: 'Jackson',
        subject: 'Welcome to Our App!', // Subject line
        text: `Hello ${name}, welcome to our platform!`, // Plain text body
        html: `<b>Hello ${name}</b>, welcome to our platform!`, // HTML body content
      });
      return true;
    } catch (error) {
      console.error('Email delivery failed:', error);
      return false;
    }
  }
}
