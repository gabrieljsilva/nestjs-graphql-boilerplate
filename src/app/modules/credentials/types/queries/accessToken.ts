import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field()
  accessToken: string;
}
