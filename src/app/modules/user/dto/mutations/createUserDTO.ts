import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class createUserDTO {
  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
