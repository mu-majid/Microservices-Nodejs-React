import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { requireAuth } from '@mmkgittix/common';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {

    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate('ticket');
  
    return res.send(orders);
  }
);

export { router as findAllOrdersRouter }