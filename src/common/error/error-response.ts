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
