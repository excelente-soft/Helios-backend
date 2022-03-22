import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 24 })
  name: string;

  @Column({ length: 24 })
  secondName: string;

  @Column({ length: 24, unique: true })
  nickname: string;

  @Column({ length: 64, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;
}
