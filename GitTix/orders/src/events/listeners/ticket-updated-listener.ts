import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@mmkgittix/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;

  // Reminder: This group is used by nats to send the event to only one member(listener/service/subscriber) of the group
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
    const { id, title, price, version } = data;
    const foundTicket = await Ticket.findByEvent(data);

    if (!foundTicket) {
      throw new Error('Ticket Not Found!');
    }

    foundTicket.set({ title, price });
    await foundTicket.save();

    msg.ack();
  }

}