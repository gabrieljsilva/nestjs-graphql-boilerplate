import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AccessToken, LoginDTO } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => AccessToken)
  async login(@Args('data') loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
