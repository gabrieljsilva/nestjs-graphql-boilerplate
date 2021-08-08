import { Injectable } from '@nestjs/common';

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
    private readonly RepoService: RepoService,
    private readonly mailerService: MailerService,
    private readonly accessService: AccessService,
  ) {}

  async createUser(dto: createUserDTO) {
    const accessAlreadyExists = this.accessService.verifyIfAccessExists(
      dto.email,
    );

    if (accessAlreadyExists) {
      throw new AlreadyExistsException('user', ['email']);
    }

    const access = this.RepoService.AcessRepository.create({
      email: dto.email,
      password: dto.password,
    });

    await this.RepoService.AcessRepository.save(access);

    const user = this.RepoService.UserRepository.create({
      userName: dto.userName,
      accessId: access.id,
      status: USER_STATUS.UNCONFIRMED,
    });

    await this.RepoService.UserRepository.save(user);

    const token = this.RepoService.TokenRepository.create({
      userId: user.id,
      token: await generateToken(6),
      type: TOKEN_TYPES.ACTIVATION_ACCOUNT,
    });

    await this.RepoService.TokenRepository.save(token);

    await this.mailerService.sendConfirmationAccountEmail(access.email, {
      userName: user.userName,
      magicLink: token.token,
    });

    return user;
  }

  async findUsers() {
    return this.RepoService.UserRepository.find({ relations: ['access'] });
  }
}
