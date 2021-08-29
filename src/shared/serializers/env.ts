import { Expose, Exclude, Transform } from 'class-transformer';

@Exclude()
export class Env {
  @Expose()
  DB_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  DB_PORT: number;

  @Expose()
  DB_USER: string;

  @Expose()
  DB_PASSWORD: string;

  @Expose()
  DB_NAME: string;

  @Expose()
  REDIS_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  REDIS_PORT: number;

  @Expose()
  APP_EMAIL: string;

  @Expose()
  SMTP_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  SMTP_PORT: number;

  @Expose()
  SMTP_USER: string;

  @Expose()
  SMTP_PASSWORD: string;

  @Expose()
  APP_SECRET: string;
}
