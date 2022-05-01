import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { User } from './user.model';

@Entity()
export class Token {
  @PrimaryColumn({ unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  refreshToken: string;
}
