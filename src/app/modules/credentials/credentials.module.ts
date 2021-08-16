import { Module, forwardRef } from '@nestjs/common';

import { CredentialsService } from './credentials.service';
import { CredentialsSubscriber } from './credentials.subscriber';

import { UserModule } from '../user';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [CredentialsService, CredentialsSubscriber],
  exports: [CredentialsService],
})
export class CredentialsModule {}
