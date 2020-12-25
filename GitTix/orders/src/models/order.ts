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


orderSchema.statics.build = (order: INewOrder) => {
  return new Order(order);
};

const Order = mongoose.model<IOrderDoc, IOrderModelProps>('Order', orderSchema);

export { Order };