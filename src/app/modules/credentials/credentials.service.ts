import { Injectable } from '@nestjs/common';
import { RepoService } from '../../repositories';

@Injectable()
export class CredentialsService {
  constructor(private readonly repoService: RepoService) {}

  async verifyIfCredentialsExists(email: string) {
    return (
      (await this.repoService.CredentialsRepository.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }
}
