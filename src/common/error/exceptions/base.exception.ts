/*
Exception이 Custom ErrorCode, path, timestamp포함하도록 구성
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { GlobalExceptionCodeEnum } from '../exception-code.enum';

export interface IBaseException {
  statusCode: number;
  errorCode: string; // Custom ErrorCode
  timestamp: Date;
  path: string;
}

// 커스텀 익셉션을 위한 base exception
export class BaseException extends HttpException implements IBaseException {
  statusCode: number;
  errorCode: string;
  timestamp: Date;
  path: string;

  constructor(statusCode: number, errorCode: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode; // 필요?
    this.statusCode = statusCode; //필요?
  }
}

// 어플리케이션에서 처리하지 못한 Exception을 위한 클래스
export class UnCatchedException extends BaseException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, GlobalExceptionCodeEnum.UnCached);
  }
}
