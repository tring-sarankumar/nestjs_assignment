/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostRepository } from './post.repository';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}
  create(createPostInput: CreatePostInput) {
    return this.postRepo.createPost(createPostInput);
  }

  updatePost(id: string, updatePostInput: UpdatePostInput) {
    return this.postRepo.updatePost(id, updatePostInput);
  }

  deletePost(postId: string) {
    return this.postRepo.deletePost(postId);
  }
}
