import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@mmkgittix/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

// we should not be validating it is mongo id, because it introduce coupling between services.(Assume tickets service is removed entirely and event are coming from other place)
router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId') 
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('a valid ticketId Must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    return res.send({});
  }
);

export { router as createOrderRouter }