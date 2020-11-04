import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super('Request Validation Error');

    // cuz we're extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeError() {
    return this.errors.map(e => {
      return { message: e.msg, field: e.param };
    });
  }
}