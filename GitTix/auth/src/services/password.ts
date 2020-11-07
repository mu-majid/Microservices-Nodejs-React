import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

export class Password {
  
  static async toHash(password: string) {
    const salt = randomBytes(4).toString('hex'); // should be 16
    const buf = (await scryptPromise(password, salt, 16)) as Buffer; // should be 64

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [ hashedPass, salt ] = storedPassword.split('.');
    const buf = (await scryptPromise(suppliedPassword, salt, 16)) as Buffer;

    return buf.toString('hex') === hashedPass;
  }
}