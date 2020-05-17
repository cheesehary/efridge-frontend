import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWish1589678565552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'wish',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'progress',
            type: 'int',
            default: 0,
          },
          {
            name: 'autopay',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('wish', true);
  }
}
