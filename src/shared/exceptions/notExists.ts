import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistsException extends HttpException {
  constructor(resource: string, keys?: string[]) {
    super(
      {
        message: `${resource} not exists`,
        code: 'RESOURCE_NOT_EXISTS',
        keys: keys,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
