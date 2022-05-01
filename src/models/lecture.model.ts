import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Course } from './course.model';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'lecture', update: false })
  type: string;

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