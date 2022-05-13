import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resource: string, keys?: string[]) {
    super(
      {
        message: `${resource} not found`,
        code: 'RESOURCE_NOT_FOUND',
        keys: keys,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
