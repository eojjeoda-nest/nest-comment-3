import { BaseException } from './base.exception';
import { PostExceptionCodeEnum } from '../exception-code.enum';
import { HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND, PostExceptionCodeEnum.PostNotFound);
  }
}
