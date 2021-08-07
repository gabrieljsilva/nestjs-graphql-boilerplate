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

import { Access } from './Access';

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

  @Field()
  @Column({ name: 'access_id' })
  accessId: string;

  @Field()
  @OneToOne(() => Access)
  @JoinColumn({ name: 'access_id', referencedColumnName: 'id' })
  access: Access;

  @Column({ enum: USER_STATUS })
  status: USER_STATUS;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
