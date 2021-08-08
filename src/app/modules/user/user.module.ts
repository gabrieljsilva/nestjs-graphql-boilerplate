import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MailerModule } from '../mailer';
@Module({
  imports: [MailerModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
