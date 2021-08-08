import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { createUserDTO } from './dto';
import { RepoService } from '../../repositories';
import { generateToken } from '../../../config/crypt';
import { TOKEN_TYPES, USER_STATUS } from '../../../shared/constants';
import { MailerService } from '../mailer';
import { AccessService } from '../access';
import { AlreadyExistsException } from '../../../shared/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly RepoService: RepoService,
    private readonly mailerService: MailerService,
    private readonly accessService: AccessService,
  ) {}

  async createUser(dto: createUserDTO) {
    const accessAlreadyExists = await this.accessService.verifyIfAccessExists(
      dto.email,
    );

    if (accessAlreadyExists) {
      throw new AlreadyExistsException('user', ['email']);
    }

    return this.connection.transaction(async (transaction) => {
      const access = this.RepoService.AcessRepository.create({
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

      const token = this.RepoService.TokenRepository.create({
        userId: user.id,
        token: await generateToken(6),
        type: TOKEN_TYPES.ACTIVATION_ACCOUNT,
      });

      await transaction.save(token);

      await this.mailerService.sendConfirmationAccountEmail(access.email, {
        userName: user.userName,
        magicLink: token.token,
      });

      return user;
    });
  }

  async findUsers() {
    return this.RepoService.UserRepository.find({ relations: ['access'] });
  }
}
