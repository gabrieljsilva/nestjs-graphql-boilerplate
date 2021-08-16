import { Injectable } from '@nestjs/common';
import { RepoService } from '../../repositories';

import { User } from '../../entities';
import { NotExistsException } from '../../../shared/exceptions';
import { UserService } from '../user';

@Injectable()
export class CredentialsService {
  constructor(private readonly repoService: RepoService) {}

  async verifyIfCredentialsExistsByEmail(email: string) {
    return (
      (await this.repoService.CredentialsRepository.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }

  async findPersonaByCredentials(credentialId: string) {
    const credentials = await this.repoService.CredentialsRepository.findOne({
      where: { id: credentialId },
    });

    if (!credentials) {
      throw new NotExistsException('credentials');
    }

    // switch (credentials.type) {
    //   case 'USER':
    //     return this.break;
    // }
  }
}
