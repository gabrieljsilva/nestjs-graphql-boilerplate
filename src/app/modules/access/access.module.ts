import { Module } from '@nestjs/common';

import { AccessService } from './access.service';
import { AccessSubscriber } from './access.subscriber';

@Module({
  providers: [AccessService, AccessSubscriber],
})
export class AccessModule {}
