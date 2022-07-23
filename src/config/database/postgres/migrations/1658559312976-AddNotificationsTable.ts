import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddNotificationsTable1658559312976 implements MigrationInterface {
  private table = new Table({
    name: 'notifications',
    columns: [
      id,
      {
        name: 'title',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'body',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'is_read',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'template_id',
        type: 'varchar',
        isNullable: false,
      },
      createdAt,
      updatedAt,
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
