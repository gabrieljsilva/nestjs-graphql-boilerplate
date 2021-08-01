import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as entities from 'app/entities';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(entities.Access)
    public readonly AcessRepository: Repository<entities.Access>,
    @InjectRepository(entities.User)
    public readonly UserRepository: Repository<entities.User>,
  ) {}
}
