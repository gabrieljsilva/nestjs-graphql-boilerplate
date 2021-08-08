import { createTransport } from 'nodemailer';

export const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6133abb8216cfe',
    pass: 'bb4e8cf633ac29',
  },
});
