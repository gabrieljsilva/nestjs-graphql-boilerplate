import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { id, createdAt, updatedAt } from '../utils/columns';

export class CreateUserTable1627847008467 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      id,
      {
        name: 'user_name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'access_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'varchar',
        isNullable: false,
      },
      createdAt,
      updatedAt,
    ],
  });

  private tableForeignKey = new TableForeignKey({
    name: 'user_has_access',
    columnNames: ['access_id'],
    referencedTableName: 'accesses',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.tableForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.tableForeignKey);
    await queryRunner.dropTable(this.table);
  }
}
