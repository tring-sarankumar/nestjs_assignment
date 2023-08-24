import { Injectable } from '@nestjs/common/decorators';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { UpdatePostInput } from './dto/update-post.input';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const count = await this.count({
      where: { userId: createPostInput.userId },
    });
    createPostInput.postorder = count + 1;
    return this.save({
      name: createPostInput.postName,
      userId: createPostInput.userId,
      postorder: createPostInput.postorder,
    });
  }

  async updatePost(
    id: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    const updatedResult = await this.update(id, updatePostInput);

    if (updatedResult.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.findOne({ where: { id: id } });
  }

  async deletePost(postId: string): Promise<Post> {
    const postToDelete = await this.findOne({ where: { id: postId } });
    if (!postToDelete) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const orderNumberToDelete = postToDelete.postorder;
    await this.createQueryBuilder()
      .update(Post)
      .set({ postorder: () => `"postorder" - 1` })
      .where('"postorder" > :orderNumberToDelete', { orderNumberToDelete })
      .execute();

    await this.softRemove(postToDelete);

    return postToDelete;
  }
}
