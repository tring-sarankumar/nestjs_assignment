import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  postName: string;

  @Field()
  userId: string;

  @Field(() => Int, { nullable: true })
  postorder: number;
}
