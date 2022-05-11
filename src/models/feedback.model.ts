import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Grade } from './grade.model';
import { Practice } from './practice.model';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  review: string;

  @Column()
  rating: number;

  @ManyToOne(() => Practice)
  practice: Practice;

  @ManyToOne(() => Grade)
  @JoinColumn()
  grade: Grade;
}
