import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import OrmConfig from 'config/database/postgres/orm.config';

import { RepoModule } from './repositories';
import { UserModule } from 'app/modules/user';
import { AccessModule } from 'app/modules/access';
@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RepoModule,
    UserModule,
    AccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
