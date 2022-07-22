import { FileUpload } from 'graphql-upload';
import { Readable, Writable } from 'stream';
import { FileMetadata } from '../fileMetadata';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class FileUploader {
  abstract generateKey(file: FileUpload): Promise<string>;
  abstract upload(file: FileUpload): Promise<FileMetadata>;
  abstract exists(key: string): Promise<boolean>;
  abstract delete(key: string): Promise<boolean>;
  abstract getFile(key: string): Promise<Readable>;
}
