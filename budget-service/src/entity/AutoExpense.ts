import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'auto_expense' })
export class AutoExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column()
  tag: string;

  @Column()
  category: string;
}
