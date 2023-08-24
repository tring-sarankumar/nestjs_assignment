import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreateUserInputs } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInputs } from './dto/update-user.input';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async allUsers(): Promise<User[]> {
    return await this.find({
      relations: ['post'],
    });
  }

  async createUser(createUserInputs: CreateUserInputs): Promise<User> {
    return this.save({
      fullname: createUserInputs.fullname,
      phonenumber: createUserInputs.phonenumber,
    });
  }

  async updateUser(
    id: string,
    updateUserInputs: UpdateUserInputs,
  ): Promise<User> {
    const updatedResult = await this.update(id, updateUserInputs);

    if (updatedResult.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.findOne({ where: { id: id } });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOneBy({
      id: id,
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return await this.softRemove(user);
  }
}
