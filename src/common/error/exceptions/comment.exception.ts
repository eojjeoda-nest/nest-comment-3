import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { CommentExceptionCodeEnum } from '../exception-code.enum';

export class CommentNotFondException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND, CommentExceptionCodeEnum.CommentNotFound);
  }
}
