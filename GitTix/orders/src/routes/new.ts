import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@mmkgittix/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

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
    const  { ticketId } = req.body;

    // Find Ticket to reserve.
    const foundTicket = await Ticket.findById(ticketId);
    if (!foundTicket) {
      throw new NotFoundError();
    }

    // Make sure ticket is not reserved
    const isReserved = Order.findOne(
      { ticket: foundTicket, status: { $in: [OrderStatus.CREATED, OrderStatus.COMPLETE, OrderStatus.AWAITING_PAYMENT] } }
    );

    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved.');
    }

    return res.send({});
  }
);

export { router as createOrderRouter }