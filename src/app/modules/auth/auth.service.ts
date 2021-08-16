import { Injectable } from '@nestjs/common';

import { RepoService } from '../../repositories';
import { Credentials } from '../../entities/Credentials';
import { NotExistsException } from '../../../shared/exceptions';
import { compare } from '../../../config/crypt';

@Injectable()
export class AuthService {
  constructor(private readonly repoService: RepoService) {}

  async validateCredentials(email: string, password: string) {
    const credentials = await this.repoService.CredentialsRepository.findOne({
      email: email,
    });

    if (!credentials) {
      throw new NotExistsException('credentials');
    }

    const passwordMatchs = await compare(password, credentials.password);

    if (!passwordMatchs) {
      return null;
    }

    delete credentials.password;

    return credentials;
  }
}
