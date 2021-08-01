import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'accesses' })
export class Access {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;
}
