import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { CredentialsService } from './credentials.service';
import { AccessToken, LoginDTO } from './types';

@Resolver()
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Mutation(() => AccessToken)
  async login(@Args('data') loginDTO: LoginDTO) {
    return this.credentialsService.login(loginDTO);
  }
}
