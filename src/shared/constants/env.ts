import 'dotenv/config';
import { plainToClass } from 'class-transformer';

// Import Env only via relative path because typeorm:migration can throw error
import { Env } from '../serializers';

export const ENV = plainToClass(Env, process.env);
