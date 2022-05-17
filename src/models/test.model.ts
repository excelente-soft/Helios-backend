import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TaskType } from '@interfaces/task.interface';

import { Course } from '@models/course.model';
import { Quest } from '@models/quest.model';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  time: number;

  @Column({ default: TaskType.TEST, enum:TaskType.TEST, update: false })
  type: TaskType.TEST;

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
