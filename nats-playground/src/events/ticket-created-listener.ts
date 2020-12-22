import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener {
  subject: string = 'ticket:created';
  queueGroupName: string = 'payment-service';

  onMessage(data: any, msg: Message): void {
    console.log('Event data ', data)
    msg.ack();
  }
}