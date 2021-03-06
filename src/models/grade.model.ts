import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { Student } from '@models/student.model';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  rating: number;

  @Column()
  taskId: string;

  @Column()
  studentId: string;

  @ManyToOne(() => Student)
  student: Student;

  @CreateDateColumn()
  createdAt: Date;
}
