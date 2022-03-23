import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  accessLevel: number;

  @Column({ length: 24, unique: true })
  roleName: string;

  @Column({ length: 10, unique: true })
  color: string;
}
