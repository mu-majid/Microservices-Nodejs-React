import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@mmkgittix/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

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
    const { title, price } = req.body;
    const ticket = Ticket.build({
      price,
      title,
      userId: req.currentUser!.id
    });
    await ticket.save();

    return res.status(201).send(ticket);
  }
);

export { router as createTicketsRouter };