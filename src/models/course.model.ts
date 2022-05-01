import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm';

import { Lecture } from './lecture.model';
import { Practice } from './practice.model';
import { Test } from './test.model';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 64 })
  name: string;

  @Column({ length: 64 })
  shortDescription: string;

  @Column({ length: 1024 })
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  author: string;

  @Column()
  targetAccessLevel: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  creationDate: Timestamp;

  @OneToMany(() => Lecture, (lecture) => lecture.course)
  lectures: Lecture[];

  @OneToMany(() => Test, (test) => test.course)
  tests: Test[];

  @OneToMany(() => Practice, (practice) => practice.course)
  practices: Practice[];
}
