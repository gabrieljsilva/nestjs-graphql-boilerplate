import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { formatError } from '../config/graphql/formatError';
import OrmConfig from '../config/database/postgres/orm.config';

import { RepoModule } from './repositories';
import { UserModule } from './modules/user';
import { AccessModule } from './modules/access';
import { TokenModule } from './modules/token';
import { MailerModule } from './modules/mailer';
@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      formatError: formatError,
    }),
    RepoModule,
    UserModule,
    AccessModule,
    TokenModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
