import { Publisher, TicketUpdatedEvent, Subjects } from '@mmkgittix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
  
}