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
}
