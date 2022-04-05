import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '@models/course.model';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  text: string;

  @Column({ unique: true })
  position: number;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;
}
