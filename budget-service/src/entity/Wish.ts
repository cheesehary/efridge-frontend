import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'wish' })
export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  progress: number;

  @Column()
  autopay: number;
}
