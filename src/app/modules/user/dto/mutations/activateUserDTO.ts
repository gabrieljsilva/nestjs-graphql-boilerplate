import { InputType, Field } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@Exclude()
@InputType()
export class ActivateUserDTO {
  @Expose()
  @Field()
  @IsEmail()
  email: string;

  @Expose()
  @Field()
  @Length(6, 6)
  token: string;
}
