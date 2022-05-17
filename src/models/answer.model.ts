import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Quest } from '@models/quest.model';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @Column()
  questId: string;

  @ManyToOne(() => Quest, (Quest) => Quest.answers, { onDelete: 'CASCADE' })
  quest: string;
}
