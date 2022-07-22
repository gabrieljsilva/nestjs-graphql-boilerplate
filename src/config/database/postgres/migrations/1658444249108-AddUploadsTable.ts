import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddUploadsTable1658444249108 implements MigrationInterface {
  private table = new Table({
    name: 'uploads',
    columns: [
      id,
      {
        name: 'original_name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'url',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'key',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'type',
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
