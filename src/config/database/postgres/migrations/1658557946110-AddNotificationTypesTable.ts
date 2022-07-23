import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddNotificationTypesTable1658557946110
  implements MigrationInterface
{
  private table = new Table({
    name: 'notification_types',
    columns: [
      id,
      {
        name: 'type',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
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
