import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { Certificate } from '@models/certificate.model';
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

  @Column()
  userId: string;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @Column()
  courseId: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

  @OneToMany(() => Certificate, (certificate) => certificate.student)
  certificates: Certificate[];
}
