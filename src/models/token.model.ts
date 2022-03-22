import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '@models/user.model';

@Entity()
export class Token {
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  refreshToken: string;
}
