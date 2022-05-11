import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TaskType } from '@interfaces/task.interface';

import { Course } from './course.model';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: TaskType.lecture, enum:TaskType.lecture, update: false })
  type: TaskType.lecture;

  @Column()
  text: string;

  @Column()
  position: number;

  @Column()
  courseId: string;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;
}
