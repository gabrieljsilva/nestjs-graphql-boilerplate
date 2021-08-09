import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { id, createdAt } from '../utils/columns';

export class CreateTokensTable1628303099837 implements MigrationInterface {
  private table = new Table({
    name: 'tokens',
    columns: [
      id,
      {
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'token',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'use_attempts',
        type: 'int',
        isNullable: false,
        default: 0,
      },
      createdAt,
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
