import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { TOKEN_TYPES } from '../../shared/constants';
import { User } from './Users';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ enum: TOKEN_TYPES })
  type: TOKEN_TYPES;

  @Column()
  token: string;

  @Column({ name: 'use_attempts' })
  useAttempts: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
