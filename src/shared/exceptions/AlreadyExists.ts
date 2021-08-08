import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(resource: string, keys?: string[]) {
    super(
      {
        message: `${resource} already exists`,
        code: 'RESOURCE_ALREADY_EXISTS',
        keys: keys,
      },
      HttpStatus.CONFLICT,
    );
  }
}
