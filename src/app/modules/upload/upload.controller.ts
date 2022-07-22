import { Controller, Get, Param, Req, StreamableFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get(':key')
  async getFile(@Param('key') key: string, @Req() response: Response) {
    const file = await this.uploadService.getFile(key);
    return new StreamableFile(file);
  }
}
