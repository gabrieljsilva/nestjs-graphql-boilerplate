import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'credentials' })
export class Credentials {
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;
}
