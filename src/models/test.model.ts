import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TaskType } from '@interfaces/task.interface';

import { Course } from './course.model';
import { Quest } from './quest.model';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  time: number;

  @Column({ default: TaskType.test, enum:TaskType.test, update: false })
  type: TaskType.test;

  @Column()
  position: number;

  @Column()
  courseId: string;

  @OneToMany(() => Quest, (quest) => quest.test)
  quests: Quest[];

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;
}
