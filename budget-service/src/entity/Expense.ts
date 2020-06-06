import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'expense' })
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  financeId: string;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column()
  tag: string;

  @Column()
  category: string;
}
