import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepoService } from './repositories.service';
import { objectToArray } from 'shared/serializers';
import * as entities from 'app/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(objectToArray(entities))],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
