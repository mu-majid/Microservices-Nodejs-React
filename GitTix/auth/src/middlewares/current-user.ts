import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  id: string;
  email: string
}

// Adding additional property to express request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return  next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;
    req.currentUser = payload;
  }
  catch (error) {
    console.log('ERROR : Error Occured in currentUser Middleware while decoding JWT.')
  }

  next();
}