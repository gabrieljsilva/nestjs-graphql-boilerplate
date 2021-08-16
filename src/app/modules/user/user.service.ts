import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RepoService } from '../../repositories';
import { generateToken } from '../../../config/crypt';
import {
  AlreadyExistsException,
  NotExistsException,
} from '../../../shared/exceptions';
import {
  TOKEN_TYPES,
  TOKEN_STATUS,
  USER_STATUS,
  CREDENTIALS_TYPE,
} from '../../../shared/constants';
import { MailerService } from '../mailer';
import { CredentialsService } from '../credentials';
import { compare } from '../../../config/crypt';

import { CreateUserDTO, ActivateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly RepoService: RepoService,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => CredentialsService))
    private readonly CredentialsService: CredentialsService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const credentialsAlreadyExists =
      await this.CredentialsService.verifyIfCredentialsExistsByEmail(dto.email);

    if (credentialsAlreadyExists) {
      throw new AlreadyExistsException('user', ['email']);
    }

    return this.connection.transaction(async (transaction) => {
      const credentials = this.RepoService.CredentialsRepository.create({
        email: dto.email,
        password: dto.password,
        type: CREDENTIALS_TYPE.USER,
      });

      await transaction.save(credentials);

      const user = this.RepoService.UserRepository.create({
        userName: dto.userName,
        credentialsId: credentials.id,
        status: USER_STATUS.UNCONFIRMED,
      });

      await transaction.save(user);

      const unHashedToken = await generateToken(6);

      const token = this.RepoService.TokenRepository.create({
        userId: user.id,
        token: unHashedToken,
        type: TOKEN_TYPES.ACTIVATION_ACCOUNT,
        status: TOKEN_STATUS.UNUSED,
      });

      await transaction.save(token);

      await this.mailerService.sendConfirmationAccountEmail(credentials.email, {
        userName: user.userName,
        token: unHashedToken,
      });

      return user;
    });
  }

  async activateUser(dto: ActivateUserDTO) {
    const credentials = await this.RepoService.CredentialsRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!credentials) throw new NotExistsException('user');

    const user = await this.RepoService.UserRepository.findOne({
      where: {
        credentialsId: credentials.id,
      },
    });

    if (!user) throw new NotExistsException('user');

    const token = await this.RepoService.TokenRepository.createQueryBuilder()
      .where('user_id = :userId ', {
        userId: user.id,
      })
      .andWhere('status = :status', { status: TOKEN_STATUS.UNUSED })
      .andWhere('use_attempts < 3')
      .orderBy('created_at', 'DESC')
      .getOne();

    if (!token) throw new NotExistsException('token');

    const tokenNotMatch = !compare(dto.token, token.token);

    token.useAttempts++;
    token.status = TOKEN_STATUS.USED;

    await this.RepoService.TokenRepository.save(token);

    if (tokenNotMatch) throw new NotExistsException('token');

    user.status = USER_STATUS.ACTIVE;

    await this.RepoService.UserRepository.save(user);

    return user;
  }

  async findUsers() {
    return this.RepoService.UserRepository.find({
      relations: ['credentials'],
      where: {
        status: USER_STATUS.ACTIVE,
      },
    });
  }

  async findUserByCredentialsId(credentialsId: string) {
    return this.RepoService.UserRepository.findOne({
      where: {
        credentials: credentialsId,
      },
      relations: ['credentials'],
    });
  }
}
