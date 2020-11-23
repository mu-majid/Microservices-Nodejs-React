import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/forbidden-error';

// always run after currentuser middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
}