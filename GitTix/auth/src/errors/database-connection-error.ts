export class DatabaseConnectionError extends Error { 
  reason:string = 'Error Connecting to DB!';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}