import { InputType, Field } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
@Exclude()
@InputType()
export class createUserDTO {
  @Expose()
  @Field()
  @Length(4, 16)
  userName: string;

  @Expose()
  @Field()
  @IsEmail()
  email: string;

  @Expose()
  @Field()
  @Length(8, 16)
  password: string;
}
