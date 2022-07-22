import { Injectable, NotFoundException } from '@nestjs/common';
import { RepoService } from '../../repositories';
import { FileUpload } from 'graphql-upload';
import { FileUploader } from './types/interfaces';

@Injectable()
export class UploadService {
  constructor(
    private readonly repoService: RepoService,
    private readonly uploadProvider: FileUploader,
  ) {}

  async upload(file: FileUpload) {
    const fileMetadata = await this.uploadProvider.upload(file);

    return await this.repoService.UploadMetadataRepository.save({
      key: fileMetadata.key,
      type: fileMetadata.mimeType,
      url: fileMetadata.url,
      originalName: fileMetadata.originalName,
    });
  }

  async delete(key: string) {
    try {
      const uploadMetadata =
        await this.repoService.UploadMetadataRepository.findOneOrFail({
          where: {
            key,
          },
        });

      await this.repoService.UploadMetadataRepository.delete({
        key,
      });

      await this.uploadProvider.delete(key);

      return uploadMetadata;
    } catch {
      throw new NotFoundException(`cannot find upload with key ${key}`);
    }
  }

  async getFile(key: string) {
    return this.uploadProvider.getFile(key);
  }
}
