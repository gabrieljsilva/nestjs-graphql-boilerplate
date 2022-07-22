import { FileUploader } from '../../types/interfaces';
import { UploadMetadata } from '../../../../entities';
import { FileUpload } from 'graphql-upload';
import { createWriteStream, existsSync } from 'fs';
import { RepoService } from '../../../../repositories';
import * as uuid from 'uuid';
import * as mime from 'mime';
import { join } from 'path';

export class LocalUploadStrategy implements FileUploader {
  private readonly path: string;

  constructor(protected readonly repoService: RepoService, path?: string) {
    this.path = path;
  }

  async exists(key: string): Promise<boolean> {
    return existsSync(join(this.path, key));
  }

  async generateKey(file: FileUpload): Promise<string> {
    const id = uuid.v4();
    const type = mime.getExtension(file.mimetype);
    const key = `${id}.${type}`;
    const exists = await this.exists(key);
    if (exists) {
      return this.generateKey(file);
    }
    return key;
  }

  async upload(file: FileUpload): Promise<UploadMetadata> {
    return new Promise(async (resolve, reject) => {
      const key = await this.generateKey(file);
      return file
        .createReadStream()
        .pipe(createWriteStream(`./uploads/${key}`))
        .on('finish', async () => {
          const upload = await this.repoService.UploadMetadataRepository.save({
            key,
            originalName: file.filename,
            type: file.mimetype,
            url: key,
          });

          resolve(upload);
        })
        .on('error', (err) => reject(err));
    });
  }
}
