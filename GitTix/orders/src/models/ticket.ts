import mongoose from 'mongoose';
import { INewTicket, ITicketDoc, ITicketModelProps } from './interfaces';

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
  return new Ticket(ticket);
};

const Ticket = mongoose.model<ITicketDoc, ITicketModelProps>('Ticket', ticketSchema);

export { Ticket };