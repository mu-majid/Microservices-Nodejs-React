import mongoose from 'mongoose';
import { OrderStatus } from '@mmkgittix/common';
 
// describe creating new order
export interface INewOrder {
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  ticket: ITicketDoc;
}

// describes properties on order document (getorder)
export interface IOrderDoc extends mongoose.Document {
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  ticket: ITicketDoc;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on Order model to make typescript able to validate our doc to be created
export interface IOrderModelProps extends mongoose.Model<IOrderDoc> {
  build(order: INewOrder): IOrderDoc;
}


// HUGE IMPORTANT NOTEEEEE
// This code is already writen in tickets service, but this ticket model is associated to orders service so we would not put it in common module

// describe creating new ticket
export interface INewTicket {
  id: string;
  title: string;
  price: number;
}

// describes properties on ticket document (getticket)
export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>
}

// describes properties on Ticket model to make typescript able to validate our doc to be created
export interface ITicketModelProps extends mongoose.Model<ITicketDoc> {
  build(ticket: INewTicket): ITicketDoc;
}