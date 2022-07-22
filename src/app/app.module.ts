import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { formatError } from '../config/graphql';
import OrmConfig from '../config/database/postgres/orm.config';
import { RepoModule } from './repositories';
import { UserModule } from './modules/user';
import { CredentialsModule } from './modules/credentials';
import { TokenModule } from './modules/token';
import { MailerModule } from './modules/mailer';
import { AuthModule } from './modules/auth';
import { UploadModule } from './modules/upload';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      formatError: formatError,
      context: ({ req }) => ({ req }),
      uploads: false,
    }),
    RepoModule,
    UserModule,
    CredentialsModule,
    TokenModule,
    MailerModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
