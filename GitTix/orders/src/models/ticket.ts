import mongoose from 'mongoose';
import { INewTicket, ITicketDoc, ITicketModelProps } from './interfaces';
import { Order } from './order';
import { OrderStatus } from '@mmkgittix/common';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: {
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.statics.build = (ticket: INewTicket) => {
  return new Ticket({
    _id: ticket.id,
    title: ticket.title,
    price: ticket.price
  });
};

// called like this: ticket.isReserved()
ticketSchema.methods.isReserved = async function () {
  const resutt = await Order.findOne(
    { ticket: this, status: { $in: [OrderStatus.CREATED, OrderStatus.COMPLETE, OrderStatus.AWAITING_PAYMENT] } }
  );

  return resutt ? true : false;
}

const Ticket = mongoose.model<ITicketDoc, ITicketModelProps>('Ticket', ticketSchema);

export { Ticket };