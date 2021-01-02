import { Listener, OrderCreatedEvent, Subjects } from "@mmkgittix/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from 'node-nats-streaming';
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket Not Found!');
    }

    ticket.set({ orderId: data.id });
    await ticket.save();

    msg.ack();
  }
}