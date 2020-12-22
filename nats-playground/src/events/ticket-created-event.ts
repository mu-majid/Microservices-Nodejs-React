import { Subjects }  from './subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TICKET_CREATED;
  data: {
    id: string;
    title: string;
    price: number;
  }
}