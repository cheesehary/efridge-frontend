import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1589604623553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'googleId',
            type: 'varchar',
            length: '36',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user', true);
  }
}
