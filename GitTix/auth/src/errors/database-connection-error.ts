import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError { 
  statusCode: number = 500;
  reason:string = 'Error Connecting to DB!';

  constructor() {
    super('Database Connection Error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public serializeError() {
    return [
      { message: this.reason }
    ];
  }

}