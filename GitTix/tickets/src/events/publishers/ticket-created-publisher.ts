import { Publisher, TicketCreatedEvent, Subjects } from '@mmkgittix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
  
}