import { BullModuleOptions } from '@nestjs/bull';

import { ENV } from '../../../shared/constants';

export const BullMailerConfig: BullModuleOptions = {
  name: 'mailer',
  redis: {
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT,
  },
};
