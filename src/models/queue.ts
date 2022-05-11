import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,  Generated } from 'typeorm';
import { Practice } from './practice.model';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  position: number;

  @Column()
  link: string;

  @ManyToOne(() => Practice)
  practice: Practice;
}