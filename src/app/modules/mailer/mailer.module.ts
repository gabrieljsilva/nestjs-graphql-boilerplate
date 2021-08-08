import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { BullMailerConfig } from '../../../config/database/redis';

import { MailerProcessor } from './mailer.processor';
import { MailerService } from './mailer.service';

@Module({
  imports: [BullModule.registerQueue(BullMailerConfig)],
  providers: [MailerProcessor, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
