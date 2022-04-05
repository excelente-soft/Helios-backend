import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '@models/course.model';
import { Quest } from '@models/quest.model';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  position: number;

  @OneToMany(() => Quest, (quest) => quest.test)
  quests: Quest[];

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;
}
