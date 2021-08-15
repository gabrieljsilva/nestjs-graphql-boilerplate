import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as entities from 'app/entities';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(entities.Credentials)
    public readonly CredentialsRepository: Repository<entities.Credentials>,
    @InjectRepository(entities.User)
    public readonly UserRepository: Repository<entities.User>,
    @InjectRepository(entities.Token)
    public readonly TokenRepository: Repository<entities.Token>,
  ) {}
}
