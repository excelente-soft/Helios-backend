import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn} from 'typeorm';
import { Grade } from '@models/grade.model';
import { Practice } from '@models/practice.model';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  review: string;

  @Column()
  rating: number;

  @Column()
  practiceId: string;

  @Column()
  gradeId: string;

  @ManyToOne(() => Practice)
  practice: Practice;

  @ManyToOne(() => Grade)
  @JoinColumn()
  grade: Grade;

  @CreateDateColumn()
  createdAt: Date;
}
