import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  shortDescription: string;

  @Column({ unique: true })
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  author: string;
}
