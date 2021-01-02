import express, { Request, Response } from 'express';
import { OrderStatus, NotFoundError, NotAuthorizedError, requireAuth } from '@mmkgittix/common';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {

    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.CANCELLED;
    await order.save();

    // publishing an event saying this was cancelled!
    // fire and forget (no await on publish, so if error happened, user shoudl not would know)
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id
      }
    })

    return res.status(204).send(order);
  }
);

export { router as deleteOrderRouter }