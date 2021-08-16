import { Resolver, Query, Args } from '@nestjs/graphql';
import { Credentials } from '../../entities';

import { AuthService } from './auth.service';
import { CredentialsNotMatchException } from '../../../shared/exceptions';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Credentials)
  async getCredentials(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const credentials = await this.authService.validateCredentials(
      email,
      password,
    );
    if (!credentials) {
      throw new CredentialsNotMatchException();
    }
    return credentials;
  }
}
