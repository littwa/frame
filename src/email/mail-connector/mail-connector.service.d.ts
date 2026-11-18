import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailConnectorService implements MailerOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createMailerOptions(): MailerOptions | Promise<MailerOptions>;
}
