import { Module } from '@nestjs/common';

import { RepoModule } from '../../repositories';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [RepoModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
