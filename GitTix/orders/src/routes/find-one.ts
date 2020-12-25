import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { NotFoundError, NotAuthorizedError, requireAuth } from '@mmkgittix/common';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as findAllOrdersRouter }