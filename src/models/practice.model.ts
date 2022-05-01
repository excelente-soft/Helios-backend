import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './course.model';

@Entity()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  objective: string;

  @Column({ default: 'none' })
  objectiveType: string;

  @Column()
  link: string;

  @Column()
  position: number;

  @Column()
  courseId: string;

  @Column({ default: 'practice', update: false })
  type: string;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;
}
