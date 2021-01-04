import { Listener, OrderCancelledEvent, Subjects, OrderStatus } from "@mmkgittix/common";
import { queueGroupName } from "./group-name";
import { Message } from 'node-nats-streaming';
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
    
    const orderToCancel = await Order.findByEvent(data);

    if (!orderToCancel) {
      throw new Error('Order Not Found');
    }

    orderToCancel.set({ status: OrderStatus.CANCELLED });
    await orderToCancel.save();

    msg.ack();
  }
  
}