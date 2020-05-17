import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExpense1589674473513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'expense',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'financeId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'tag',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'enum',
            enum: [
              'Business',
              'Cash',
              'Donations',
              'Eating Out',
              'Education',
              'Entertainment',
              'Groceries',
              'Health',
              'Home',
              'Shopping',
              'Transport',
              'Utilities',
              'Uncategorised',
            ],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('expense', true);
  }
}
