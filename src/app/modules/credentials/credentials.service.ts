import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RepoService } from '../../repositories';

import {
  CredentialsNotMatchException,
  NotExistsException,
} from '../../../shared/exceptions';
import { UserService } from '../user';
import { LoginDTO } from './types';
import { JwtPayload } from '../../../shared/types';
import { compare } from '../../../config/crypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CredentialsService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly repoService: RepoService,
    private readonly jwtService: JwtService,
  ) {}

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

    switch (credentials.type) {
      case 'USER':
        return this.userService.findUserByCredentialsId(credentials.id);
    }

    if (!credentials) {
      throw new NotExistsException('persona');
    }
  }

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

  async login({ email, password }: LoginDTO) {
    const credentials = await this.validateCredentials(email, password);

    if (!credentials) {
      throw new CredentialsNotMatchException();
    }

    const payload: JwtPayload = {
      credentialsId: credentials.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
