import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'finance' })
export class Finance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  income: number;

  @Column()
  year: number;

  @Column()
  month: number;
}
