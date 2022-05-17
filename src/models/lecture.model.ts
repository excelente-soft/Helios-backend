import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TaskType } from '@interfaces/task.interface';

import { Course } from '@models/course.model';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: TaskType.LECTURE, enum:TaskType.LECTURE, update: false })
  type: TaskType.LECTURE;

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
