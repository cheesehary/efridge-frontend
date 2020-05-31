import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfile1589673532811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'profile',
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
            default: 0,
          },
          {
            name: 'savingsGoal',
            type: 'int',
            default: 0,
          },
          {
            name: 'balance',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('profile', true);
  }
}
