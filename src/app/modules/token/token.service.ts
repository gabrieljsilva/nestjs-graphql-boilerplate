import { Injectable } from '@nestjs/common';

import { RepoService } from '../../repositories';

@Injectable()
export class TokenService {
  constructor(private readonly repoService: RepoService) {}
}
