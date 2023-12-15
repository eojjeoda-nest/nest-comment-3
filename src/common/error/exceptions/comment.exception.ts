import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { CommentExceptionCodeEnum } from '../exception-code.enum';

export class CommentNotFondException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND, CommentExceptionCodeEnum.CommentNotFound);
  }
}

export class DuplicatedCommentReportException extends BaseException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      CommentExceptionCodeEnum.DuplicatedReport,
      '중복된 신고 요청입니다',
    );
  }
}

export class DuplicatedCommentLikeException extends BaseException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      CommentExceptionCodeEnum.DuplicatedLike,
      '중복된 좋아요 요청입니다',
    );
  }
}
