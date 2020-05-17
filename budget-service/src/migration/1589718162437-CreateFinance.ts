import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFinance1589718162437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'finance',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'income',
            type: 'int',
          },
          {
            name: 'year',
            type: 'int',
          },
          {
            name: 'month',
            type: 'int',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('finance', true);
  }
}
