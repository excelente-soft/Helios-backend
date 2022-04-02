import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '@models/role.model';
import { UserType } from '../interfaces/role.interface';

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

  @Column({
    default: 'https://res.cloudinary.com/fyfka/image/upload/v1648030948/Helios-images/default-avatar_aalssv.svg',
  })
  avatar: string;

  @Column({ length: 64, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn()
  role: Role;

  @Column()
  roleId: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.Public })
  type: string;
}
