import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Student)
  student: Student;
}
