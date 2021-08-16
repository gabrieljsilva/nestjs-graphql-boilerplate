import { Module } from '@nestjs/common';

import { CredentialsService } from './credentials.service';
import { CredentialsSubscriber } from './credentials.subscriber';

import { UserModule } from '../user';

@Module({
  imports: [],
  providers: [CredentialsService, CredentialsSubscriber],
  exports: [CredentialsService],
})
export class CredentialsModule {}
