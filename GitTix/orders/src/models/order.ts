import mongoose from 'mongoose';
import { INewOrder, IOrderDoc, IOrderModelProps } from './interfaces';
import { OrderStatus } from '@mmkgittix/common';

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.CREATED
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  userId: {
    type: String,
    required: true
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
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

// orderSchema.pre('save', async function (done) {
//   // only hash the passwrd if it was modified
//   if (this.isModified('password')) {
//     const hashed = await Password.toHash(this.get('password'));
//     this.set('password', hashed);
//   }
//   done();
// });

orderSchema.statics.build = (order: INewOrder) => {
  return new Order(order);
};

const Order = mongoose.model<IOrderDoc, IOrderModelProps>('Order', orderSchema);

export { Order };