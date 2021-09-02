import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../../shared/types';

import { User } from '../../entities';
import { UserService } from './user.service';
import { CurrentUser } from '../../../shared/decorators';

import { CreateUserDTO, ActivateUserDTO } from './types';
import { GqlAuthGuard } from '../../../shared/guards';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Mutation(() => User)
  async activateUser(@Args('data') activateUserDTO: ActivateUserDTO) {
    return this.userService.activateUser(activateUserDTO);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async findUsers() {
    return this.userService.findUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async whoAmI(@CurrentUser() user: JwtPayload) {
    return this.userService.findUserByCredentialsId(user.credentialsId);
  }
}
