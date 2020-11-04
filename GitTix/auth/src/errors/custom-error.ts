// abstract not interface, because we will use instanceof check (abs class are created in js)
export abstract class  CustomError extends Error {
  abstract statusCode: number; // abstract means childern should have statusCode prop

  constructor(message: string) {
    super(message); // message is for logging purposes

    Object.setPrototypeOf(this, CustomError.prototype); // super breaks the prototype chain, and alter this to `Error`
  }

  abstract serializeError(): {message:string, field?: string}[]
}