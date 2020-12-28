import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@mmkgittix/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;

  // Reminder: This group is used by nats to send the event to only one member(listener/service/subscriber) of the group
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price
    });
    await ticket.save();

    msg.ack();
  }

}