import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { renderFile } from 'ejs';
import { resolve, join } from 'path';
import { SendMailOptions } from 'nodemailer';

import { transport } from '../../../config/mailer';
import { ENV } from '../../../shared/constants';

export interface SendEmailOptions {
  templateName: string;
  templateArgs?: any;
  mailOptions: SendMailOptions;
}

const emailTemplatesPath = resolve(
  process.cwd(),
  'src',
  'app',
  'modules',
  'mailer',
  'templates',
);

@Processor('mailer')
export class MailerProcessor {
  @Process('sendMail')
  async sendMail(job: Job<SendEmailOptions>) {
    const { templateName, templateArgs, mailOptions } = job.data;

    const html = await renderFile(
      join(emailTemplatesPath, `${templateName}.ejs`),
      templateArgs,
    );

    await transport.sendMail({
      ...mailOptions,
      html,
      from: ENV.APP_EMAIL,
    });
  }
}
