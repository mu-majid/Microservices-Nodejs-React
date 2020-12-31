import mongoose from 'mongoose';
import { INewTicket, ITicketDoc, ITicketModelProps } from './interfaces';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
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

// ticketSchema.pre('save', async function (done) {
//   // only hash the passwrd if it was modified
//   if (this.isModified('password')) {
//     const hashed = await Password.toHash(this.get('password'));
//     this.set('password', hashed);
//   }
//   done();
// });

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (ticket: INewTicket) => {
  return new Ticket(ticket);
};

const Ticket = mongoose.model<ITicketDoc, ITicketModelProps>('Ticket', ticketSchema);

export { Ticket };