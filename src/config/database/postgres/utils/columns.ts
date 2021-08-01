import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const id: TableColumnOptions = {
  name: 'id',
  type: 'varchar',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
};
export const createdAt: TableColumnOptions = {
  name: 'created_at',
  type: 'timestamp',
  default: 'now()',
};
export const updatedAt: TableColumnOptions = {
  name: 'updated_at',
  type: 'timestamp',
  default: 'now()',
};
