import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@mmkgittix/common';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    return res.sendStatus(200);
  }
);

export { router as createTicketsRouter }