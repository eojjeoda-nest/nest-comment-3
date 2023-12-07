import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export interface IValidationException {
  statusCode: number;
  errors: ValidationError[];
}
export class ValidationException
  extends HttpException
  implements IValidationException
{
  statusCode: number;
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super('', HttpStatus.BAD_REQUEST);
    this.errors = errors;
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
