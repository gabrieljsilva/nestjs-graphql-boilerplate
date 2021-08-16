import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MailerModule } from '../mailer';
import { CredentialsModule } from '../credentials';
@Module({
  imports: [MailerModule, CredentialsModule],
  providers: [UserResolver, UserService],
  exports: [],
})
export class UserModule {}
