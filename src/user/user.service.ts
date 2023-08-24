import { Injectable } from '@nestjs/common';
import { CreateUserInputs } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { UpdateUserInputs } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async allusers() {
    return this.userRepo.allUsers();
  }

  async createUser(createUserInputs: CreateUserInputs) {
    return this.userRepo.createUser(createUserInputs);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }

  async getUserById(id: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.post', 'p')
      .where('user.id =:id', { id })
      .getOne();
  }

  async updateUserById(id: string, updateUserInputs: UpdateUserInputs) {
    return this.userRepo.updateUser(id, updateUserInputs);
  }
}
