import { Module } from '@nestjs/common';

import { TokenService } from './token.service';
import { TokenSubscriber } from './token.subscriber';

@Module({
  providers: [TokenService, TokenSubscriber],
})
export class TokenModule {}
