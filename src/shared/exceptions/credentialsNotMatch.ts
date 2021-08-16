import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialsNotMatchException extends HttpException {
  constructor() {
    super(
      {
        message: `credentials not match`,
        code: 'CREDENTIALS_NOT_MATCH',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
