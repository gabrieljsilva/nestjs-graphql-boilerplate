import { FileUpload } from 'graphql-upload';
import { UploadMetadata } from '../../../../../entities';

export abstract class FileUploader {
  abstract generateKey(file: FileUpload): Promise<string>;
  abstract upload(file: FileUpload): Promise<UploadMetadata>;
  abstract exists(key: string): Promise<boolean>;
  // abstract delete();
  // abstract getFile();
}
