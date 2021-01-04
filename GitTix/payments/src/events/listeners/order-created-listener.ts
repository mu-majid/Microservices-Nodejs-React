import { Listener, OrderCreatedEvent, Subjects } from "@mmkgittix/common";
import { queueGroupName } from "./group-name";
import { Message } from 'node-nats-streaming';
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
    
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version
    });

    await order.save();

    msg.ack();
  }
}