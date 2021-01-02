import { Listener, OrderCreatedEvent, Subjects } from "@mmkgittix/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName: string = queueGroupName;

  onMessage(data: OrderCreatedEvent['data'], msg: Message): void {
    throw new Error("Method not implemented.");
  }
  
}