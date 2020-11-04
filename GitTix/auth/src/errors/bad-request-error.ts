import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public serializeError() {
    return [{ message: this.message }];
  }
}