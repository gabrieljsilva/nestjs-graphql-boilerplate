import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { User } from '../../entities';
import { UserService } from './user.service';

import { CreateUserDTO, ActivateUserDTO } from './types';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => User)
  async createUser(@Args('data') createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => User)
  async activateUser(@Args('data') activateUserDTO: ActivateUserDTO) {
    return this.userService.activateUser(activateUserDTO);
  }

  @Query(() => [User])
  async findUsers() {
    return this.userService.findUsers();
  }
}
