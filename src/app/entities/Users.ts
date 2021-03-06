import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Credentials } from './Credentials';

import { USER_STATUS } from '../../shared/constants';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'credentials_id' })
  credentialsId: string;

  @Field()
  @OneToOne(() => Credentials)
  @JoinColumn({ name: 'credentials_id', referencedColumnName: 'id' })
  credentials: Credentials;

  @Field()
  @Column({ enum: USER_STATUS })
  status: USER_STATUS;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
