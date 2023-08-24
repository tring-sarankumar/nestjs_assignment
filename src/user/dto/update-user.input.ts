import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class UpdateUserInputs {
  @Field({ nullable: true })
  fullname: string;

  @Field(() => Int, { nullable: true })
  phonenumber: number;
}
