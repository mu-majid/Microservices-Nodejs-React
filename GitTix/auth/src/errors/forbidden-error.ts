import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public serializeError() {
    return [{ message: 'Not Authorized' }];
  }
}