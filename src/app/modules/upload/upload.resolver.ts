import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadMetadata } from '../../entities';
import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { UploadService } from './upload.service';

@Resolver(UploadMetadata)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadMetadata)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.uploadService.upload(file);
  }

  @Mutation(() => UploadMetadata)
  async deleteFile(@Args('key', { type: () => String }) key: string) {
    return this.uploadService.delete(key);
  }
}
