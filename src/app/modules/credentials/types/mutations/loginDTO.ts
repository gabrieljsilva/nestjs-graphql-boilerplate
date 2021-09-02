import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class LoginDTO {
  @Expose()
  @Field()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase?.())
  email: string;

  @Expose()
  @Field()
  @Length(8, 16)
  password: string;
}
