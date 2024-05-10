import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodemailerTransporterConfig } from 'src/shared/interfaces/config.interfaces';

@Injectable()
export class MailConnectorService implements MailerOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMailerOptions(): MailerOptions | Promise<MailerOptions> {
        return this.configService.get<NodemailerTransporterConfig>('nodemailerTransporterConfig');
    }
}
