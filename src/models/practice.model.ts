import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectiveType, TaskType } from '@interfaces/task.interface';

import { Course } from './course.model';
import { Feedback } from './feedback.model';

@Entity()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  objective: string;

  @Column({ default: ObjectiveType.none, enum: ObjectiveType })
  objectiveType: ObjectiveType;

  @Column()
  link: string;

  @Column()
  position: number;

  @Column()
  courseId: string;

  @OneToMany(() => Feedback, (feedback) => feedback.practice)
  quests: Feedback[];

  @Column({ default: TaskType.practice, enum:TaskType.practice, update: false })
  type: TaskType.practice;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;
}
