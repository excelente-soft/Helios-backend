import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from 'typeorm';

import { Course } from './course.model';
import { Grade } from './grade.model';
import { User } from './user.model';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @Column()
  courseId: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
