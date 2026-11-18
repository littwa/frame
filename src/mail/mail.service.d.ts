import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    tstMail(): Promise<string>;
    sendWelcomeEmail(to: string, name: string): Promise<boolean>;
}
