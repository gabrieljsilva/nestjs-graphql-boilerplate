import { InputType, Field } from '@nestjs/graphql';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@Exclude()
@InputType()
export class ActivateUserDTO {
  @Expose()
  @Field()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase?.() || value)
  email: string;

  @Expose()
  @Field()
  @Length(6, 6)
  token: string;
}
