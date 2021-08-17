import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RepoModule } from '../../repositories';
import { CredentialsModule } from '../credentials';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    RepoModule,
    CredentialsModule,
    PassportModule,
    JwtModule.register({
      secret: 'some_cool_secret',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
