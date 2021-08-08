import { Injectable } from '@nestjs/common';
import { RepoService } from '../../repositories';

@Injectable()
export class AccessService {
  constructor(private readonly repoService: RepoService) {}

  async verifyIfAccessExists(email: string) {
    return (
      (await this.repoService.AccessRepository.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }
}
