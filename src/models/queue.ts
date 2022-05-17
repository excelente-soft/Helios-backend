import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,  Generated, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Grade } from '@models/grade.model';
import { Practice } from '@models/practice.model';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  position: number;

  @Column()
  link: string;

  @OneToOne(() => Grade)
  @JoinColumn()
  grade: Grade;

  @ManyToOne(() => Practice)
  practice: Practice;

  @CreateDateColumn()
  createdAt: Date;
}