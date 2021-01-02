import mongoose from 'mongoose';

// describe creating new ticket
export interface INewTicket {
  title: string;
  price: number;
  userId: string
}

// describes properties on ticket document (getticket)
export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on Ticket model
export interface ITicketModelProps extends mongoose.Model<ITicketDoc> {
  build(ticket: INewTicket): ITicketDoc;
}