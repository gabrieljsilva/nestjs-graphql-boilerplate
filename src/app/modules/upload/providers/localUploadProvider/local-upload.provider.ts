import { Injectable, NotFoundException } from '@nestjs/common';
import { FileMetadata, FileUploader } from '../../types/interfaces';
import { FileUpload } from 'graphql-upload';
import {
  accessSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs';
import * as uuid from 'uuid';
import * as mime from 'mime';
import { join } from 'path';

@Injectable()
export class LocalUploadProvider implements FileUploader {
  private readonly path: string;

  constructor() {
    this.path = join(process.cwd(), 'uploads');
  }

  private getFilePath(key: string) {
    return join(this.path, key);
  }

  async exists(key: string): Promise<boolean> {
    try {
      accessSync(this.getFilePath(key));
      return true;
    } catch {
      return false;
    }
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

  async upload(file: FileUpload): Promise<FileMetadata> {
    return new Promise(async (resolve, reject) => {
      const key = await this.generateKey(file);
      return file
        .createReadStream()
        .pipe(createWriteStream(this.getFilePath(key)))
        .on('close', async () => {
          const fileMetadata = new FileMetadata();
          fileMetadata.key = key;
          fileMetadata.originalName = file.filename;
          fileMetadata.mimeType = file.mimetype;
          fileMetadata.url = key;

          resolve(fileMetadata);
        })
        .on('error', (err) => {
          unlinkSync(this.getFilePath(key));
          reject(err);
        });
    });
  }

  async getFile(key: string) {
    const exists = await this.exists(key);
    if (!exists) {
      throw new NotFoundException(`cannot find upload with key: ${key}`);
    }
    return createReadStream(this.getFilePath(key));
  }

  async delete(key: string) {
    try {
      const exists = await this.exists(key);
      if (exists) {
        unlinkSync(this.getFilePath(key));
      }
      return true;
    } catch {
      throw new NotFoundException(`cannot find upload with key: ${key}`);
    }
  }
}
