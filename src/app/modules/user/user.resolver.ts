import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { User } from 'app/entities';
import { UserService } from './user.service';

import { createUserDTO } from './dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') createUserDTO: createUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Query(() => [User])
  async findUsers() {
    return this.userService.findUsers();
  }
}
