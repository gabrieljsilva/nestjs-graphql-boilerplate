import { Injectable } from '@nestjs/common';
import { LocalUploadStrategy } from './strategy/localStrategy';
import { RepoService } from '../../repositories';

@Injectable()
export class UploadService extends LocalUploadStrategy {
  constructor(protected readonly repoService: RepoService) {
    super(repoService, 'uploads');
  }
}
