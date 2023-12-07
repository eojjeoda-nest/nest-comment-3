/*
Exception이 Custom ErrorCode, path, timestamp포함하도록 구성
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { GlobalExceptionCodeEnum } from '../exception-code.enum';

export interface IBaseException {
  statusCode: number;
  errorCode: string; // Custom ErrorCode
  message: string;
}

// 커스텀 익셉션을 위한 base exception
export class BaseException extends HttpException implements IBaseException {
  statusCode: number;
  errorCode: string;
  message: string;

  constructor(statusCode: number, errorCode: string, message?: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    if (message) {
      this.message = message;
    }
  }
}

// 어플리케이션에서 처리하지 못한 Exception을 위한 클래스
export class UnCatchedException extends BaseException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, GlobalExceptionCodeEnum.UnCached);
  }
}
