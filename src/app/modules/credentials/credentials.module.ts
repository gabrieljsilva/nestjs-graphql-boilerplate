import { Module } from '@nestjs/common';

import { CredentialsService } from './credentials.service';
import { CredentialsSubscriber } from './credentials.subscriber';

@Module({
  providers: [CredentialsService, CredentialsSubscriber],
  exports: [CredentialsService],
})
export class CredentialsModule {}
