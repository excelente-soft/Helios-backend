import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Course } from './course.model';
import { Quest } from './quest.model';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'test', update: false })
  type: string;

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
