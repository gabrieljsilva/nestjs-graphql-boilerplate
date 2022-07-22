import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';

@Module({
  imports: [],
  providers: [UploadService, UploadResolver],
  exports: [UploadService],
})
export class UploadModule {}
