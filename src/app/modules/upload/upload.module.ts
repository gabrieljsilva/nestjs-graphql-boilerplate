import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { UploadController } from './upload.controller';
import { LocalUploadProvider } from './providers/localUploadProvider';
import { FileUploader } from './types/interfaces';

@Module({
  imports: [],
  providers: [
    UploadService,
    UploadResolver,
    {
      provide: FileUploader,
      useClass: LocalUploadProvider,
    },
  ],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
