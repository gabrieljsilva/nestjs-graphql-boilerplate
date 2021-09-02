import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../../../shared/guards';
import { CredentialsService } from './credentials.service';
import { CredentialsSubscriber } from './credentials.subscriber';
import { CredentialsResolver } from './credentials.resolver';

import { UserModule } from '../user';
import { ENV } from '../../../shared/constants';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: ENV.APP_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  providers: [
    CredentialsService,
    CredentialsSubscriber,
    CredentialsResolver,
    JwtStrategy,
  ],
  exports: [CredentialsService],
})
export class CredentialsModule {}
