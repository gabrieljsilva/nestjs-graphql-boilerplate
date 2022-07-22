import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { UploadController } from './upload.controller';
import { LocalUploadProvider } from './providers/localUploadProvider';

@Module({
  imports: [],
  providers: [UploadService, UploadResolver, LocalUploadProvider],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
