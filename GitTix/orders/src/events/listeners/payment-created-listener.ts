import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@mmkgittix/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.COMPLETE,
    });
    await order.save();

    /**
     * Ideally, we would publish an order updated event since we are changing the version
     * by updating its status
     * 
     * But we are not going to do so here, because we are not expecting any further updates on the completed order. 
     */

    msg.ack();
  }
}
