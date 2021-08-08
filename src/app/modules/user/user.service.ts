import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RepoService } from '../../repositories';
import { generateToken } from '../../../config/crypt';
import {
  AlreadyExistsException,
  NotExistsException,
} from '../../../shared/exceptions';
import { TOKEN_TYPES, USER_STATUS } from '../../../shared/constants';
import { MailerService } from '../mailer';
import { AccessService } from '../access';
import { compare } from '../../../config/crypt';

import { CreateUserDTO, ActivateUserDTO } from './dto';
import { ENV } from '../../../shared/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly RepoService: RepoService,
    private readonly mailerService: MailerService,
    private readonly accessService: AccessService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const accessAlreadyExists = await this.accessService.verifyIfAccessExists(
      dto.email,
    );

    if (accessAlreadyExists) {
      throw new AlreadyExistsException('user', ['email']);
    }

    return this.connection.transaction(async (transaction) => {
      const access = this.RepoService.AccessRepository.create({
        email: dto.email,
        password: dto.password,
      });

      await transaction.save(access);

      const user = this.RepoService.UserRepository.create({
        userName: dto.userName,
        accessId: access.id,
        status: USER_STATUS.UNCONFIRMED,
      });

      await transaction.save(user);

      const unHashedToken = await generateToken(6);

      const token = this.RepoService.TokenRepository.create({
        userId: user.id,
        token: unHashedToken,
        type: TOKEN_TYPES.ACTIVATION_ACCOUNT,
      });

      await transaction.save(token);

      await this.mailerService.sendConfirmationAccountEmail(access.email, {
        userName: user.userName,
        token: unHashedToken,
      });

      return user;
    });
  }

  async activateUser(dto: ActivateUserDTO) {
    const access = await this.RepoService.AccessRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!access) throw new NotExistsException('user');

    const user = await this.RepoService.UserRepository.findOne({
      where: {
        accessId: access.id,
      },
    });

    if (!user) throw new NotExistsException('user');

    const token = await this.RepoService.TokenRepository.findOne({
      where: {
        userId: user.id,
      },
      order: { id: 'DESC' },
    });

    if (!token) throw new NotExistsException('token');

    const tokenNotMatch = !compare(dto.token, token.token);

    if (tokenNotMatch) throw new NotExistsException('token');

    user.status = USER_STATUS.ACTIVE;

    await this.RepoService.UserRepository.save(user);

    return user;
  }

  async findUsers() {
    return this.RepoService.UserRepository.find({ relations: ['access'] });
  }
}
