import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@mmkgittix/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

// Should be env var || from db
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

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
    const isReserved = await foundTicket.isReserved();

    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved.');
    }

    // calculate order expiration time (15 mins)
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build order doc
    const order = Order.build({
      expiresAt: expiration,
      userId: req.currentUser!.id,
      status: OrderStatus.CREATED,
      ticket: foundTicket
    });

    await order.save();

    // fire and forget (no await on publish, so if error happened, user shoudl not would know)
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
      userId: order.userId,
      ticket: {
        id: foundTicket.id,
        price: foundTicket.price
      }
    });

    return res.status(201).send(order);
  }
);

export { router as createOrderRouter }