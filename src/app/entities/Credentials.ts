import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { CREDENTIALS_TYPE } from '../../shared/constants';

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

  @Column({ enum: CREDENTIALS_TYPE })
  type: CREDENTIALS_TYPE;
}
