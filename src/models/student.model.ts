import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '@models/course.model';
import { Grade } from '@models/grade.model';
import { User } from '@models/user.model';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
