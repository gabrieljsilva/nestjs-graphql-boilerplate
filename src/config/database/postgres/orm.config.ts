import { ConnectionOptions } from 'typeorm';

// Import ENV, entities, objectToArray only via relative path because typeorm:migration can throw error
import { ENV } from '../../../shared/constants/env';
import { objectToArray } from '../../../shared/serializers';
import * as entities from '../../../app/entities';

const config: ConnectionOptions = {
  type: 'postgres',
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: objectToArray(entities),
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
};

export default config;
