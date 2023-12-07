import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  BaseException,
  UnCatchedException,
} from '../error/exceptions/base.exception';
import { ValidationException } from '../error/exceptions/validation.exception';
import { request } from 'express';
@Catch(ValidationException) // validation Exception 캐치
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): void {
    console.log('validation exception occurred');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: exception.statusCode,
      errors: exception.errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      }),
      timestamp: new Date(),
      path: request.url,
    });
  }
}

@Catch() // 모든 Exception 캐치
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp(); // Exception Filter가 Http요청 외에도 동작하므로 필요
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: new Date(),
      path: request.url,
    });
  }
}
