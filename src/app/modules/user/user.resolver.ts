import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { User } from '../../entities';
import { UserService } from './user.service';

import { CreateUserDTO, ActivateUserDTO } from './dto';

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

  @Query(() => [User])
  async findUsers() {
    return this.userService.findUsers();
  }
}
