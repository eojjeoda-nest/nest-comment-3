import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseException, UnCatchedException } from './exceptions/base.exception';
import { format } from 'mysql2';

@Catch() // 모든 Exception 캐치
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp(); // Exception Filter가 Http요청 ㅗ이에도 동작하므로 필요
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    res.timestamp = new Date();
    res.path = request.url;

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: res.timestamp,
      path: res.path,
    });
  }
}
