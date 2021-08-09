import { createTransport } from 'nodemailer';
import { ENV } from '../../shared/constants';

export const transport = createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASSWORD,
  },
});
