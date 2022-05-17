import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectiveType, TaskType } from '@interfaces/task.interface';

import { Course } from '@models/course.model';
import { Feedback } from '@models/feedback.model';

@Entity()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  objective: string;

  @Column({ default: ObjectiveType.NONE, enum: ObjectiveType })
  objectiveType: ObjectiveType;

  @Column()
  link: string;

  @Column()
  position: number;

  @Column()
  courseId: string;

  @OneToMany(() => Feedback, (feedback) => feedback.practice)
  quests: Feedback[];

  @Column({ default: TaskType.PRACTICE, enum:TaskType.PRACTICE, update: false })
  type: TaskType.PRACTICE;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;
}
