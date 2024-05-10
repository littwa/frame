import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SUBJECT, SUPPORT_BRAVO_TEAM } from 'src/shared/constants/mailer.constants';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(toEmail: string, verifCode: string) {
        await this.mailerService.sendMail({
            to: toEmail,
            from: SUPPORT_BRAVO_TEAM,
            subject: SUBJECT,
            html: `<h2>Verification Code: <span style="border: 1px dashed; padding: 8px">${verifCode.slice(
                0,
                3,
            )} - ${verifCode.slice(3)}</span></h2>`,
        });
    }
}
