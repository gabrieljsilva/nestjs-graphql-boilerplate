import { InputType, Field } from '@nestjs/graphql';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@Exclude()
@InputType()
export class CreateUserDTO {
  @Expose()
  @Field()
  @Length(4, 16)
  userName: string;

  @Expose()
  @Field()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase?.() || value)
  email: string;

  @Expose()
  @Field()
  @Length(8, 16)
  password: string;
}
