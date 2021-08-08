import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MailerModule } from '../mailer';
import { AccessModule } from '../access';
@Module({
  imports: [MailerModule, AccessModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
