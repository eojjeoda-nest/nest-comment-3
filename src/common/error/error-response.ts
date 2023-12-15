import { HttpException } from '@nestjs/common';

export class ErrorResponse {
  statusCode: number;
  message: string;

  constructor(exception: HttpException) {
    this.statusCode = exception.getStatus();
    this.message = this.messageTypeCheck(exception.getResponse());
  }

  messageTypeCheck(exceptionResponse: string | object) {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    } else {
      // TODO: 배열로 들어오는 경우도 있으니 처리 하기
      return exceptionResponse['message']; // validationpipe option 설정에 따라 다름 => stopAtFirstError: true,
    }
  }

  toJson() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
