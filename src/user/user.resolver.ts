import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInputs } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserInputs } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  allusers() {
    return this.userService.allusers();
  }

  @Query(() => User)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInputs') createUserInputs: CreateUserInputs) {
    return this.userService.createUser(createUserInputs);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInputs') updateUserInputs: UpdateUserInputs,
  ) {
    return this.userService.updateUserById(id, updateUserInputs);
  }

  @Mutation(() => User)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
