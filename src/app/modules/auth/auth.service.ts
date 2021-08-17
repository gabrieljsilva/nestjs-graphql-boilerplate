import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RepoService } from '../../repositories';
import {
  CredentialsNotMatchException,
  NotExistsException,
} from '../../../shared/exceptions';
import { compare } from '../../../config/crypt';
import { CredentialsService } from '../credentials';

@Injectable()
export class AuthService {
  constructor(
    private readonly repoService: RepoService,
    private readonly credentialsService: CredentialsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string) {
    const credentials = await this.repoService.CredentialsRepository.findOne({
      email: email,
    });

    if (!credentials) {
      throw new NotExistsException('credentials');
    }

    const passwordMatch = await compare(password, credentials.password);

    if (!passwordMatch) {
      return null;
    }

    delete credentials.password;

    return credentials;
  }

  async login(email: string, password: string) {
    const credentials = await this.validateCredentials(email, password);

    if (!credentials) {
      throw new CredentialsNotMatchException();
    }

    const accessToken = this.jwtService.sign({ id: credentials.id });
    return { accessToken };
  }
}
