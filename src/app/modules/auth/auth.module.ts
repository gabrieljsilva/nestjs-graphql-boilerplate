import { Module } from '@nestjs/common';

import { RepoModule } from '../../repositories';
import { CredentialsModule } from '../credentials';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [RepoModule, CredentialsModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
