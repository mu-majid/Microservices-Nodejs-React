import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  public statusCode: number = 404;

  constructor() {
    super('Resource Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  public serializeError() {

    return [{ message: 'Not Found' }];
  }
}