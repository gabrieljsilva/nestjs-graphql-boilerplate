import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddNotificationDevicesTable1658558923908
  implements MigrationInterface
{
  private table = new Table({
    name: 'notification_devices',
    columns: [
      id,
      {
        name: 'token',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'credential_id',
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
