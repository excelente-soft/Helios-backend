import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { Student } from '@models/student.model';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hours: number;

  @Column()
  name: string;

  @Column()
  secondName: string;

  @Column()
  courseName: string;

  @Column()
  studentId: string;

  @ManyToOne(() => Student)
  student: Student;

  @CreateDateColumn()
  createdAt: Date;
}
