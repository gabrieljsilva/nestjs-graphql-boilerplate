import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddNotificationTemplatesTable1658558279937
  implements MigrationInterface
{
  private table = new Table({
    name: 'notification_templates',
    columns: [
      id,
      {
        name: 'key',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      },
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
        name: 'variables',
        type: 'varchar',
        isNullable: false,
        isArray: true,
      },
      {
        name: 'type_id',
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
