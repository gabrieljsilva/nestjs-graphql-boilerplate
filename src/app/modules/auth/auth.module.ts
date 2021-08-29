import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RepoModule } from '../../repositories';
import { CredentialsModule } from '../credentials';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../../shared/guards';
import { ENV } from '../../../shared/constants';

@Global()
@Module({
  imports: [
    RepoModule,
    CredentialsModule,
    PassportModule,
    JwtModule.register({
      secret: ENV.APP_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
