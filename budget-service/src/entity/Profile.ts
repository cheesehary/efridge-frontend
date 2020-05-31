import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  income: number;

  @Column()
  savingsGoal: number;

  @Column()
  balance: number;
}
