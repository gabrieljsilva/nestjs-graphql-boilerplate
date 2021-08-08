import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { SendEmailOptions } from './mailer.processor';

interface SendConfirmationAccountEmailArgs {
  magicLink: string;
  userName: string;
}

@Injectable()
export class MailerService {
  constructor(
    @InjectQueue('mailer') public readonly mailer: Queue<SendEmailOptions>,
  ) {}

  async sendConfirmationAccountEmail(
    destinyEmail: string,
    args: SendConfirmationAccountEmailArgs,
  ) {
    await this.mailer.add('sendMail', {
      mailOptions: {
        to: destinyEmail,
      },
      templateName: 'confirmAccount',
      templateArgs: args,
    });
  }
}
