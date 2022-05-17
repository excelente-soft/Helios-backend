import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Answer } from '@models/answer.model';
import { Test } from '@models/test.model';

@Entity()
export class Quest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @ManyToOne(() => Test, (Test) => Test.quests, { onDelete: 'CASCADE' })
  test: string;

  @Column()
  testId: string;

  @OneToMany(() => Answer, (answer) => answer.quest)
  answers: Answer[];
}
