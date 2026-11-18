import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(toEmail: string, verifCode: string): Promise<void>;
}
