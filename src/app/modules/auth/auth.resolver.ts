import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AccessToken } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
