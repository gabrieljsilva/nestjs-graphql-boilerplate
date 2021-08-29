import { Module, forwardRef } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MailerModule } from '../mailer';
import { CredentialsModule } from '../credentials';

@Module({
  imports: [MailerModule, forwardRef(() => CredentialsModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
